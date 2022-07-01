import {SubstrateExtrinsic, SubstrateEvent, SubstrateBlock} from "@subql/types";
import nodemailer from "nodemailer";
import axios from "axios";
import request from "request";
import util from "util";

import {
    AskResultJson,
    PurchasedAvgPriceEvent,
    NewPurchasedRequestEvent,
    NewPreCheckTask,
    NewPreCheckResult,
    JsonNumberValue,
    PreCheckStruct,
    EndOfAskEra,
    PurchaseRewardToken,
    TotalPurchaseRewardToken,
    InsufficientCountOfValidators,
    PayForPurchase,
    AresAccount,
    StakingBondedEvent,
    StakingChilledEvent,
    ImOnlineSomeOfflineEvent,
    SessionNewSessionEvent,
    StakingRewardRecord,
    StakingRewardedEvent,
    TotalAmountOfRewardRecord, StakingErasTotalStakeRecord, CrossChainRequestEvent
} from "../types";
import {Balance} from "@polkadot/types/interfaces";

// created_at: T::BlockNumber,
//     era: EraIndex,
//     who: T::AccountId,
//     reward: BalanceOf<T>,
export async function handleEventPurchaseRewardToken(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [created_at, era_num, who, reward]
        }
    } = event;

    let record = new PurchaseRewardToken(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.event_bn = event.block.block.header.number.toString();
    record.era_num = parseInt(era_num.toString());
    record.who = who.toString();
    record.reward = (reward as Balance).toBigInt();
    await record.save();

    let total_reward = await TotalPurchaseRewardToken.get('TotalPurchaseRewardToken');
    if(!total_reward) {
        total_reward = new TotalPurchaseRewardToken('TotalPurchaseRewardToken');
        total_reward.reward = record.reward;
    }else{
        total_reward.reward += record.reward;
    }
    await total_reward.save();
}

// era: EraIndex,
// era_income: BalanceOf<T>,
//     era_points: AskPointNum,
//     session_index: SessionIndex,
export async function handleEventEndOfAskEra(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [era_num, era_income, era_points, session_index]
        }
    } = event;
    let record = new EndOfAskEra(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.era_num = parseInt(era_num.toString());
    record.era_income = (era_income as Balance).toBigInt();
    record.era_points = (era_points as Balance).toBigInt();
    record.session_index = parseInt(session_index.toString());
    await record.save();
}



export async function handleEventAresOraclePurchasedAvgPrice(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [purchase_id, purchase_data]
        }
    } = event;

    await makeNewPurchasedRequestEvent(`${purchase_id.toString()}`);

    let record = await PurchasedAvgPriceEvent.get(`${purchase_id.toString()}`);
    if(!record){
        record = new PurchasedAvgPriceEvent(`${purchase_id.toString()}`);
    }
    record.purchased_id = purchase_id.toString();
    record.purchased_eventId = purchase_id.toString();
    record.raw_result_list = purchase_data.toHuman().toString();
    let result_list: AskResultJson[] = [];
    (purchase_data as unknown as Array<any>).forEach((result_data) => {
        let tmpObj: AskResultJson = {
            price_key: 'null',
            create_bn: '',
            reached_type: 0,
            respondents: []
        };
        tmpObj.price_key = result_data.toHuman()[0];
        tmpObj.create_bn = result_data.toHuman()[1].createBn;
        tmpObj.reached_type = parseInt(result_data.toHuman()[1].reachedType) ;
        tmpObj.respondents = result_data.toHuman()[2];
        result_list.push(tmpObj);
    });
    record.result_list = result_list;

    await record.save();
}

export async function handleEventAresOracleNewPurchasedRequest(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [purchase_id, purchase_request_data, prepayments]
        }
    } = event;

    let record = await NewPurchasedRequestEvent.get(`${purchase_id.toString()}`) ;
    if(!record) {
        record = new NewPurchasedRequestEvent(`${purchase_id.toString()}`);
    }
    // await makePurchasedAvgPriceEvent(`${purchase_id.toString()}`);
    let request_data_obj = (purchase_request_data as any);
    logger.info(`purchase_id::#### ${purchase_id.toString()}`);
    logger.info(`request_data A::####  ${request_data_obj.accountId}, ${purchase_request_data.toString()}, ` );
    logger.info(`request_data B::#### ${prepayments.toString()}`);
    record.prepayments = (prepayments as Balance).toBigInt();
    record.account_id = request_data_obj.accountId.toString();
    record.offer = (request_data_obj.offer as Balance).toBigInt();
    record.create_bn = request_data_obj.createBn.toString();
    record.submit_threshold = request_data_obj.submitThreshold.toString();
    record.max_duration = request_data_obj.maxDuration.toString();
    record.request_keys = [];

    // logger.info(`request_data C::#### ${request_data_obj.request_keys.toArray()}, ${request_data_obj.request_keys.toHuman()}`);
    (request_data_obj.requestKeys.toArray() as unknown as Array<any>).forEach((request_data) => {
        logger.info(`request_data = ${request_data.toHuman().toString()}`)
        record.request_keys.push(request_data.toHuman().toString());
    });
    // record.avg_resultId = `${purchase_id.toString()}`;
    logger.info(`record ::#### ${record.request_keys}`);
    await record.save();
}

async function makePurchasedAvgPriceEvent(purchase_id:string):Promise<void> {
    const checkPurchase = await PurchasedAvgPriceEvent.get(purchase_id);
    if(!checkPurchase) {
        await new PurchasedAvgPriceEvent(purchase_id).save();
    }
}

// handleEventInsufficientCountOfValidators
export async function handleEventInsufficientCountOfValidators(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [purchase_id]
        }
    } = event;

    logger.info(`block_number::#### ${event.block.block.header.number.toString()}`);
    await makeNewPurchasedRequestEvent(`${purchase_id.toString()}`);
    logger.info(`purchase_id::#### ${purchase_id.toString()}`);
    let record = new InsufficientCountOfValidators(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.purchased_id = `${purchase_id.toString()}`;
    record.purchased_eventId = `${purchase_id.toString()}`;
    await record.save();
}


// handleEventPayForPurchase
// agg_count: u32,
//     dest: T::AccountId,
//     fee: BalanceOf<T>,
//     purchase_id: PurchaseId,
//     unreserve_balance: BalanceOf<T>,
//     who: T::AccountId,
export async function handleEventPayForPurchase(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [agg_count, dest, fee, purchase_id, unreserve_balance, who]
        }
    } = event;
    await makeNewPurchasedRequestEvent(`${purchase_id.toString()}`);
    let record = new PayForPurchase(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.purchased_id = `${purchase_id.toString()}`;
    record.purchased_eventId = `${purchase_id.toString()}`;
    record.agg_count = parseInt(agg_count.toString());
    record.dest = dest.toString();
    record.fee = (fee as Balance).toBigInt();
    record.unreserve_balance = (unreserve_balance as Balance).toBigInt();
    record.who = who.toString();
    await record.save();
}

async function makeNewPurchasedRequestEvent(purchase_id:string):Promise<void> {
    const checkPurchase = await NewPurchasedRequestEvent.get(purchase_id);
    if(!checkPurchase) {
        await new NewPurchasedRequestEvent(purchase_id).save();
    }
}

export async function handleEventAresOracleNewPreCheckTask(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [stash_account, ares_account, create_bn]
        }
    } = event;

    await makePreCheckResult(stash_account.toString(), create_bn.toString());
    let record = new NewPreCheckTask(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.stash_account = stash_account.toString();
    record.ares_account = ares_account.toString();
    record.event_bn = event.block.block.header.number.toString();
    record.create_bn = create_bn.toString();
    record.check_resultId = `${stash_account.toString()}-${create_bn.toString()}`;
    await record.save();
}

export async function handleEventAresOracleNewPreCheckResult(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [stash_account, create_bn, pre_check_struct_vec, task_at, result_status]
        }
    } = event;

    let record = new NewPreCheckResult(`${stash_account.toString()}-${task_at.toString()}`);
    record.stash_account = stash_account.toString();
    record.event_bn = event.block.block.header.number.toString();
    record.create_bn = create_bn.toString();
    record.result_status = result_status.toString();
    record.work_data = [];
    logger.info(`record ::#### ${pre_check_struct_vec.toHuman()}, ${pre_check_struct_vec.toString()}, ${pre_check_struct_vec.toJSON()}`);
    (pre_check_struct_vec as unknown as Array<any>).forEach((result_data) => {
        let tmpPreCheckStruct: PreCheckStruct = {
            max_offset: result_data.maxOffset.toHuman().toString(),
            price_key: result_data.priceKey.toHuman().toString(),
            timestamp: result_data.timestamp.toHuman().toString(),
            number_val: result_data.numberVal,
        }
        record.work_data.push(tmpPreCheckStruct);
    });
    await record.save();
}

async function makePreCheckResult(stash_account:string, create_bn: string):Promise<void> {
    const checkResult = await NewPreCheckResult.get(`${stash_account}-${create_bn}`);
    if(!checkResult) {
        let record = new NewPreCheckResult(`${stash_account}-${create_bn}`);
        record.create_bn = create_bn;
        record.stash_account = stash_account;
        record.work_data = [];
        await record.save();
    }
}

async function makeAresAccount(account:string):Promise<AresAccount> {
    let ares_account = await AresAccount.get(`${account}`)
    if(!ares_account) {
        ares_account = new AresAccount(`${account}`)
        ares_account.staking_total_reward = BigInt(0)
        await ares_account.save();
    }

    return ares_account
}

async function makeStakingRewardRecord(eraNum: string):Promise<[StakingRewardRecord, boolean]> {
    let eraObj = await StakingRewardRecord.get(`${eraNum}`)
    if(!eraObj) {
        eraObj = new StakingRewardRecord(`${eraNum}`)
        await eraObj.save();
        return [eraObj, true]
    }
    return [eraObj, false]
}

async function getTotalAmountOfRewardRecordObj(): Promise<TotalAmountOfRewardRecord> {
    let rewardObj = await TotalAmountOfRewardRecord.get(`TotalAmountOfRewardRecord`)
    if(rewardObj){
        return rewardObj
    }
    rewardObj = new TotalAmountOfRewardRecord(`TotalAmountOfRewardRecord`)
    rewardObj.total_reward_of_claimed = BigInt(0)
    rewardObj.total_reward_of_minted = BigInt(0)
    return rewardObj
}

async function makeTotalStakeRecord(era: number): Promise<StakingErasTotalStakeRecord> {
    let stakeRecord = await StakingErasTotalStakeRecord.get(era.toString())
    if(stakeRecord) return stakeRecord
    stakeRecord = new StakingErasTotalStakeRecord(era.toString())
    stakeRecord.deposit = BigInt(0)
    return stakeRecord
}

function fillTimeInfos(obj: any, timestamp: number): any {
    obj.timestamp = timestamp

    const date = new Date(timestamp + 28800000);
    // const date = new Date(timestamp);
    const Y = date.getFullYear()
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)
    const D = date.getDate()
    const h = date.getHours()
    const ii = date.getMinutes()
    const s = date.getSeconds()
    obj.timestring = `${Y}-${M}-${D} ${h}:${ii}:${s}`
    return obj
}

// ----------------------

export async function handleEventStakingBonded(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [stash_account, deposit_balance]
        }
    } = event;
    const timestamp = await api.query.timestamp.now();

    await makeAresAccount(stash_account.toString())
    let record = new StakingBondedEvent(`${stash_account.toString()}-${event.block.block.header.number.toString()}-${event.idx}`)
    record.event_bn = event.block.block.header.number.toBigInt()
    record.whoId = stash_account.toString();
    record.deposit =(deposit_balance as Balance).toBigInt();
    record = fillTimeInfos(record, timestamp.toNumber())
    await record.save();
}

export async function handleEventStakingChilled(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [stash_account]
        }
    } = event;
    const timestamp = await api.query.timestamp.now();

    await makeAresAccount(stash_account.toString())
    let record = new StakingChilledEvent(`${stash_account.toString()}-${event.block.block.header.number.toString()}-${event.idx}`)
    record.event_bn = event.block.block.header.number.toBigInt()
    record.whoId = stash_account.toString();
    record = fillTimeInfos(record, timestamp.toNumber())
    await record.save()
}

export async function handleEventImOnlineSomeOffline(event: SubstrateEvent): Promise<void> {
    // [["4TS6cxuBJ4AeZttG1fXtViTYLG1P93bb27eCRb76DjNZ13rp",{"total":"0x000000000000000000d9974a2325bba0","own":999999999999972,"others":[{"who":"4TkCgb1ZifsrHwd2zJ7vKTqFhTYkzaKTVRxeeezpyKX36995","value":"0x000000000000000000d609cb7e5f3bbc"}]}], ["4Uyfe8RUVJouZESrqmMDP2ZQ94SXTZ8mh5mQk5tnJxawmmfH",{"total":"0x000000000000000000d9974a2325bba0","own":999999999999972,"others":[{"who":"4TkCgb1ZifsrHwd2zJ7vKTqFhTYkzaKTVRxeeezpyKX36995","value":"0x000000000000000000d609cb7e5f3bbc"}]}], ["4V4jXhL6VYoUGBJx5P32DuVosXGhw7PVAdLXapYfUXYzu66V",{"total":4403282898765024,"own":4403282898765024,"others":[]}]]
    // ["4TS6cxuBJ4AeZttG1fXtViTYLG1P93bb27eCRb76DjNZ13rp",{"total":"0x000000000000000000d9974a2325bba0","own":999999999999972,"others":[{"who":"4TkCgb1ZifsrHwd2zJ7vKTqFhTYkzaKTVRxeeezpyKX36995","value":"0x000000000000000000d609cb7e5f3bbc"}]}]
    const {
        event: {
            data: [data]
        }
    } = event;

    const data_vec = (data as any);
    const info_data = data_vec.toArray();
    for( const idx_a in info_data) {

        const [stash_account, {
            total,
            own,
            others,
        } ] = info_data[idx_a]
        // logger.info(`stash_account = ${stash_account},
        //     total = ${total},
        //     own = ${own},
        //     others = ${others},
        // `)
        logger.info(`stash_account = ${stash_account}, 
            own = ${own}, 
        `)

        const timestamp = await api.query.timestamp.now();

        await makeAresAccount(stash_account.toString())
        let record = new ImOnlineSomeOfflineEvent(`${stash_account.toString()}-${event.block.block.header.number.toString()}-${event.idx}-V${idx_a}`)
        record.whoId = stash_account.toString()
        record.event_bn = event.block.block.header.number.toBigInt()
        record.deposit = (own as Balance).toBigInt();
        record.type = 'validator'
        record = fillTimeInfos(record, timestamp.toNumber())
        await record.save()

        // let record = new StakingChilledEvent(`${stash_account.toString()}-${event.idx}`)
        for(const idx_b in others.toArray()) {
            const other_acc = others[idx_b].who;
            const other_deposit = (others[idx_b].value as Balance).toBigInt();

            await makeAresAccount(other_acc.toString())
            let record = new ImOnlineSomeOfflineEvent(`${other_acc.toString()}-${event.block.block.header.number.toString()}-${event.idx}-N${idx_b}`)
            record.whoId = other_acc.toString()
            record.event_bn = event.block.block.header.number.toBigInt()
            record.deposit = (own as Balance).toBigInt();
            record.type = 'nominater'
            record = fillTimeInfos(record, timestamp.toNumber())
            await record.save()
        }
    }
}

//
export async function handleEventSessionNewSession(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [session_id]
        }
    } = event;
    const timestamp = await api.query.timestamp.now();

    let record = new SessionNewSessionEvent(`${session_id}`)
    record.event_bn = event.block.block.header.number.toBigInt()
    record.session_id = parseInt(session_id.toString())
    record = fillTimeInfos(record, timestamp.toNumber())

    // get validator set
    const validators = await api.query.session.validators();
    record.validator_count = validators.length
    record.validator_set = [];
    validators.map(acc=>{
        record.validator_set.push(acc.toHuman())
    })

    // Get staking era
    const currentEra = await api.query.staking.currentEra()
    const activeEra = await api.query.staking.activeEra()
    if(currentEra.isSome && activeEra.isSome){
        record.staking_current_era = parseInt(currentEra.value.toString())
        record.staking_active_era = parseInt(activeEra.value.toJSON()['index'])
        // Rewards are always generated at the end of era so update the previous era's reward.
        const reward_staking_active_era = record.staking_active_era - 1 > 0 ? record.staking_active_era - 1 : 0
        const validator_reward = await api.query.staking.erasValidatorReward(reward_staking_active_era)
        if(validator_reward.isSome){

            const [stakingRewardObj, isNew] = await makeStakingRewardRecord(`${reward_staking_active_era}`)
            if(isNew){
                stakingRewardObj.eras_validator_reward = (validator_reward.value as Balance).toBigInt();
                stakingRewardObj.event_bn = event.block.block.header.number.toBigInt()
                stakingRewardObj.staking_era = reward_staking_active_era
                await stakingRewardObj.save()

                let rewardObj = await getTotalAmountOfRewardRecordObj()
                rewardObj.total_reward_of_minted += BigInt(stakingRewardObj.eras_validator_reward)
                await rewardObj.save()
            }
        }
        // Get staking.erasTotalStake
        const totalStake = await api.query.staking.erasTotalStake(record.staking_active_era)
        const totalStakeRecord = await makeTotalStakeRecord(record.staking_active_era)
        totalStakeRecord.era = record.staking_active_era
        totalStakeRecord.deposit = BigInt(totalStake.toString())
        await totalStakeRecord.save()
    }
    await record.save()
}

export async function handleEventStakingRewarded(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [stash_id, reward_balance]
        }
    } = event;
    const timestamp = await api.query.timestamp.now();
    const aresAcc = await makeAresAccount(stash_id.toString())
    let record = new StakingRewardedEvent(`${event.block.block.header.number.toString()}-${event.idx}`)
    record.event_bn = event.block.block.header.number.toBigInt()
    record.whoId = stash_id.toString()
    record.deposit = (reward_balance as Balance).toBigInt();
    record = fillTimeInfos(record, timestamp.toNumber())
    await record.save()

    aresAcc.staking_total_reward = BigInt(aresAcc.staking_total_reward) + BigInt(record.deposit)
    await aresAcc.save()

    let rewardObj = await getTotalAmountOfRewardRecordObj()
    rewardObj.total_reward_of_claimed += BigInt(record.deposit)
    await rewardObj.save()
}

export async function handleCrossChainRequestEvent(event: SubstrateEvent) : Promise<void> {
    const {
        event: {
            data: [acc, ident, kind, amount]
        }
    } = event;
    const timestamp = await api.query.timestamp.now();
    // logger.info(` #### handleCrossChainRequestEvent ${timestamp}.`, acc, ident, kind, amount);
    logger.info(` #### handleCrossChainRequestEvent ${acc.toHuman()}, ${ident.toHuman()}， ${kind.toHuman()}， ${amount.toHuman()}.`, );
    let record = new CrossChainRequestEvent(`${ident.toString()}`)
    record.acc = acc.toString()
    record.iden = `${ident.toString()}`
    record.create_bn = BigInt(`${event.block.block.header.number.toString()}`)
    record.final_type = 0
    record.amount = BigInt(amount.toString())
    // @ts-ignore
    if(kind.isEth){
        record.kind = 'eth'
        // @ts-ignore
        record.dest = kind.asEth.toString()
    // @ts-ignore
    }else if(kind.isBsc){
        record.kind = 'bsc'
        // @ts-ignore
        record.dest = kind.asBsc.toString()
    }
    logger.info("################### A")
    logger.info(record.acc)
    logger.info(record.iden)
    logger.info(record.amount)
    logger.info(record.kind)
    logger.info(record.dest)
    logger.info("################### B")
    await record.save()
}

// #manualBridge.CompletedList
// #Completed cross-chain requests
// #Vec<ManualBridgeCrossChainInfo> (Vec<T>)
// #0: ManualBridgeCrossChainInfo: ManualBridgeCrossChainInfo
// #{
// #iden: 0xa32d000001
// #kind: {
// #BSC: 0x766df9f905cae2d8560672239ca29e1e52bae65d
// #}
// #amount: 699,000,000,000,000
// #}
export async function handleManualBridgeCompletedListEvent(event: SubstrateEvent): Promise<void> {
    const {
        event: {
            data: [completedList]
        }
    } = event;
    const completedJson = completedList.toString()
    const completedObjList = JSON.parse(completedJson)

    for( const idx in completedObjList) {
        const requestEvent = await CrossChainRequestEvent.get(`${completedObjList[idx].iden}`)
        if(requestEvent) {
            requestEvent.final_type = 1
            await requestEvent.save()
        }
    }

    // for(const idx in completedList){
    //     logger.info(idx)
    //     const completedObj = completedList[idx]
    //     logger.info(completedObj)
    //     logger.info("==========================")
    //     for(const idz in completedObj.toArray()) {
    //         logger.info(idz)
    //         logger.info(completedObj.iden)
    //         logger.info(completedObj.kind)
    //         logger.info(completedObj.amount)
    //
    //     }
    // }

    // logger.info(completedList[0].iden)
    // logger.info(completedList[0].amount)

}