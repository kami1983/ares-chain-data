"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleManualBridgeCompletedListEvent = exports.handleCrossChainRequestEvent = exports.handleEventStakingRewarded = exports.handleEventSessionNewSession = exports.handleEventImOnlineSomeOffline = exports.handleEventStakingChilled = exports.handleEventStakingBonded = exports.handleEventAresOracleNewPreCheckResult = exports.handleEventAresOracleNewPreCheckTask = exports.handleEventPayForPurchase = exports.handleEventInsufficientCountOfValidators = exports.handleEventAresOracleNewPurchasedRequest = exports.handleEventAresOraclePurchasedAvgPrice = exports.handleEventEndOfAskEra = exports.handleEventPurchaseRewardToken = void 0;
const types_1 = require("../types");
// created_at: T::BlockNumber,
//     era: EraIndex,
//     who: T::AccountId,
//     reward: BalanceOf<T>,
async function handleEventPurchaseRewardToken(event) {
    const { event: { data: [created_at, era_num, who, reward] } } = event;
    let record = new types_1.PurchaseRewardToken(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.event_bn = event.block.block.header.number.toString();
    record.era_num = parseInt(era_num.toString());
    record.who = who.toString();
    record.reward = reward.toBigInt();
    await record.save();
    let total_reward = await types_1.TotalPurchaseRewardToken.get('TotalPurchaseRewardToken');
    if (!total_reward) {
        total_reward = new types_1.TotalPurchaseRewardToken('TotalPurchaseRewardToken');
        total_reward.reward = record.reward;
    }
    else {
        total_reward.reward += record.reward;
    }
    await total_reward.save();
}
exports.handleEventPurchaseRewardToken = handleEventPurchaseRewardToken;
// era: EraIndex,
// era_income: BalanceOf<T>,
//     era_points: AskPointNum,
//     session_index: SessionIndex,
async function handleEventEndOfAskEra(event) {
    const { event: { data: [era_num, era_income, era_points, session_index] } } = event;
    let record = new types_1.EndOfAskEra(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.era_num = parseInt(era_num.toString());
    record.era_income = era_income.toBigInt();
    record.era_points = era_points.toBigInt();
    record.session_index = parseInt(session_index.toString());
    await record.save();
}
exports.handleEventEndOfAskEra = handleEventEndOfAskEra;
async function handleEventAresOraclePurchasedAvgPrice(event) {
    const { event: { data: [purchase_id, purchase_data] } } = event;
    await makeNewPurchasedRequestEvent(`${purchase_id.toString()}`);
    let record = await types_1.PurchasedAvgPriceEvent.get(`${purchase_id.toString()}`);
    if (!record) {
        record = new types_1.PurchasedAvgPriceEvent(`${purchase_id.toString()}`);
    }
    record.purchased_id = purchase_id.toString();
    record.purchased_eventId = purchase_id.toString();
    record.raw_result_list = purchase_data.toHuman().toString();
    let result_list = [];
    purchase_data.forEach((result_data) => {
        let tmpObj = {
            price_key: 'null',
            create_bn: '',
            reached_type: 0,
            respondents: []
        };
        tmpObj.price_key = result_data.toHuman()[0];
        tmpObj.create_bn = result_data.toHuman()[1].createBn;
        tmpObj.reached_type = parseInt(result_data.toHuman()[1].reachedType);
        tmpObj.respondents = result_data.toHuman()[2];
        result_list.push(tmpObj);
    });
    record.result_list = result_list;
    await record.save();
}
exports.handleEventAresOraclePurchasedAvgPrice = handleEventAresOraclePurchasedAvgPrice;
async function handleEventAresOracleNewPurchasedRequest(event) {
    const { event: { data: [purchase_id, purchase_request_data, prepayments] } } = event;
    let record = await types_1.NewPurchasedRequestEvent.get(`${purchase_id.toString()}`);
    if (!record) {
        record = new types_1.NewPurchasedRequestEvent(`${purchase_id.toString()}`);
    }
    // await makePurchasedAvgPriceEvent(`${purchase_id.toString()}`);
    let request_data_obj = purchase_request_data;
    logger.info(`purchase_id::#### ${purchase_id.toString()}`);
    logger.info(`request_data A::####  ${request_data_obj.accountId}, ${purchase_request_data.toString()}, `);
    logger.info(`request_data B::#### ${prepayments.toString()}`);
    record.prepayments = prepayments.toBigInt();
    record.account_id = request_data_obj.accountId.toString();
    record.offer = request_data_obj.offer.toBigInt();
    record.create_bn = request_data_obj.createBn.toString();
    record.submit_threshold = request_data_obj.submitThreshold.toString();
    record.max_duration = request_data_obj.maxDuration.toString();
    record.request_keys = [];
    // logger.info(`request_data C::#### ${request_data_obj.request_keys.toArray()}, ${request_data_obj.request_keys.toHuman()}`);
    request_data_obj.requestKeys.toArray().forEach((request_data) => {
        logger.info(`request_data = ${request_data.toHuman().toString()}`);
        record.request_keys.push(request_data.toHuman().toString());
    });
    // record.avg_resultId = `${purchase_id.toString()}`;
    logger.info(`record ::#### ${record.request_keys}`);
    await record.save();
}
exports.handleEventAresOracleNewPurchasedRequest = handleEventAresOracleNewPurchasedRequest;
async function makePurchasedAvgPriceEvent(purchase_id) {
    const checkPurchase = await types_1.PurchasedAvgPriceEvent.get(purchase_id);
    if (!checkPurchase) {
        await new types_1.PurchasedAvgPriceEvent(purchase_id).save();
    }
}
// handleEventInsufficientCountOfValidators
async function handleEventInsufficientCountOfValidators(event) {
    const { event: { data: [purchase_id] } } = event;
    logger.info(`block_number::#### ${event.block.block.header.number.toString()}`);
    await makeNewPurchasedRequestEvent(`${purchase_id.toString()}`);
    logger.info(`purchase_id::#### ${purchase_id.toString()}`);
    let record = new types_1.InsufficientCountOfValidators(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.purchased_id = `${purchase_id.toString()}`;
    record.purchased_eventId = `${purchase_id.toString()}`;
    await record.save();
}
exports.handleEventInsufficientCountOfValidators = handleEventInsufficientCountOfValidators;
// handleEventPayForPurchase
// agg_count: u32,
//     dest: T::AccountId,
//     fee: BalanceOf<T>,
//     purchase_id: PurchaseId,
//     unreserve_balance: BalanceOf<T>,
//     who: T::AccountId,
async function handleEventPayForPurchase(event) {
    const { event: { data: [agg_count, dest, fee, purchase_id, unreserve_balance, who] } } = event;
    await makeNewPurchasedRequestEvent(`${purchase_id.toString()}`);
    let record = new types_1.PayForPurchase(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.purchased_id = `${purchase_id.toString()}`;
    record.purchased_eventId = `${purchase_id.toString()}`;
    record.agg_count = parseInt(agg_count.toString());
    record.dest = dest.toString();
    record.fee = fee.toBigInt();
    record.unreserve_balance = unreserve_balance.toBigInt();
    record.who = who.toString();
    await record.save();
}
exports.handleEventPayForPurchase = handleEventPayForPurchase;
async function makeNewPurchasedRequestEvent(purchase_id) {
    const checkPurchase = await types_1.NewPurchasedRequestEvent.get(purchase_id);
    if (!checkPurchase) {
        await new types_1.NewPurchasedRequestEvent(purchase_id).save();
    }
}
async function handleEventAresOracleNewPreCheckTask(event) {
    const { event: { data: [stash_account, ares_account, create_bn] } } = event;
    await makePreCheckResult(stash_account.toString(), create_bn.toString());
    let record = new types_1.NewPreCheckTask(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.stash_account = stash_account.toString();
    record.ares_account = ares_account.toString();
    record.event_bn = event.block.block.header.number.toString();
    record.create_bn = create_bn.toString();
    record.check_resultId = `${stash_account.toString()}-${create_bn.toString()}`;
    await record.save();
}
exports.handleEventAresOracleNewPreCheckTask = handleEventAresOracleNewPreCheckTask;
async function handleEventAresOracleNewPreCheckResult(event) {
    const { event: { data: [stash_account, create_bn, pre_check_struct_vec, task_at, result_status] } } = event;
    let record = new types_1.NewPreCheckResult(`${stash_account.toString()}-${task_at.toString()}`);
    record.stash_account = stash_account.toString();
    record.event_bn = event.block.block.header.number.toString();
    record.create_bn = create_bn.toString();
    record.result_status = result_status.toString();
    record.work_data = [];
    logger.info(`record ::#### ${pre_check_struct_vec.toHuman()}, ${pre_check_struct_vec.toString()}, ${pre_check_struct_vec.toJSON()}`);
    pre_check_struct_vec.forEach((result_data) => {
        let tmpPreCheckStruct = {
            max_offset: result_data.maxOffset.toHuman().toString(),
            price_key: result_data.priceKey.toHuman().toString(),
            timestamp: result_data.timestamp.toHuman().toString(),
            number_val: result_data.numberVal,
        };
        record.work_data.push(tmpPreCheckStruct);
    });
    await record.save();
}
exports.handleEventAresOracleNewPreCheckResult = handleEventAresOracleNewPreCheckResult;
async function makePreCheckResult(stash_account, create_bn) {
    const checkResult = await types_1.NewPreCheckResult.get(`${stash_account}-${create_bn}`);
    if (!checkResult) {
        let record = new types_1.NewPreCheckResult(`${stash_account}-${create_bn}`);
        record.create_bn = create_bn;
        record.stash_account = stash_account;
        record.work_data = [];
        await record.save();
    }
}
async function makeAresAccount(account) {
    let ares_account = await types_1.AresAccount.get(`${account}`);
    if (!ares_account) {
        ares_account = new types_1.AresAccount(`${account}`);
        ares_account.staking_total_reward = BigInt(0);
        await ares_account.save();
    }
    return ares_account;
}
async function makeStakingRewardRecord(eraNum) {
    let eraObj = await types_1.StakingRewardRecord.get(`${eraNum}`);
    if (!eraObj) {
        eraObj = new types_1.StakingRewardRecord(`${eraNum}`);
        await eraObj.save();
        return [eraObj, true];
    }
    return [eraObj, false];
}
async function getTotalAmountOfRewardRecordObj() {
    let rewardObj = await types_1.TotalAmountOfRewardRecord.get(`TotalAmountOfRewardRecord`);
    if (rewardObj) {
        return rewardObj;
    }
    rewardObj = new types_1.TotalAmountOfRewardRecord(`TotalAmountOfRewardRecord`);
    rewardObj.total_reward_of_claimed = BigInt(0);
    rewardObj.total_reward_of_minted = BigInt(0);
    return rewardObj;
}
async function makeTotalStakeRecord(era) {
    let stakeRecord = await types_1.StakingErasTotalStakeRecord.get(era.toString());
    if (stakeRecord)
        return stakeRecord;
    stakeRecord = new types_1.StakingErasTotalStakeRecord(era.toString());
    stakeRecord.deposit = BigInt(0);
    return stakeRecord;
}
function fillTimeInfos(obj, timestamp) {
    obj.timestamp = timestamp;
    const date = new Date(timestamp + 28800000);
    // const date = new Date(timestamp);
    const Y = date.getFullYear();
    const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    const D = date.getDate();
    const h = date.getHours();
    const ii = date.getMinutes();
    const s = date.getSeconds();
    obj.timestring = `${Y}-${M}-${D} ${h}:${ii}:${s}`;
    return obj;
}
// ----------------------
async function handleEventStakingBonded(event) {
    const { event: { data: [stash_account, deposit_balance] } } = event;
    const timestamp = await api.query.timestamp.now();
    await makeAresAccount(stash_account.toString());
    let record = new types_1.StakingBondedEvent(`${stash_account.toString()}-${event.block.block.header.number.toString()}-${event.idx}`);
    record.event_bn = event.block.block.header.number.toBigInt();
    record.whoId = stash_account.toString();
    record.deposit = deposit_balance.toBigInt();
    record = fillTimeInfos(record, timestamp.toNumber());
    await record.save();
}
exports.handleEventStakingBonded = handleEventStakingBonded;
async function handleEventStakingChilled(event) {
    const { event: { data: [stash_account] } } = event;
    const timestamp = await api.query.timestamp.now();
    await makeAresAccount(stash_account.toString());
    let record = new types_1.StakingChilledEvent(`${stash_account.toString()}-${event.block.block.header.number.toString()}-${event.idx}`);
    record.event_bn = event.block.block.header.number.toBigInt();
    record.whoId = stash_account.toString();
    record = fillTimeInfos(record, timestamp.toNumber());
    await record.save();
}
exports.handleEventStakingChilled = handleEventStakingChilled;
async function handleEventImOnlineSomeOffline(event) {
    // [["4TS6cxuBJ4AeZttG1fXtViTYLG1P93bb27eCRb76DjNZ13rp",{"total":"0x000000000000000000d9974a2325bba0","own":999999999999972,"others":[{"who":"4TkCgb1ZifsrHwd2zJ7vKTqFhTYkzaKTVRxeeezpyKX36995","value":"0x000000000000000000d609cb7e5f3bbc"}]}], ["4Uyfe8RUVJouZESrqmMDP2ZQ94SXTZ8mh5mQk5tnJxawmmfH",{"total":"0x000000000000000000d9974a2325bba0","own":999999999999972,"others":[{"who":"4TkCgb1ZifsrHwd2zJ7vKTqFhTYkzaKTVRxeeezpyKX36995","value":"0x000000000000000000d609cb7e5f3bbc"}]}], ["4V4jXhL6VYoUGBJx5P32DuVosXGhw7PVAdLXapYfUXYzu66V",{"total":4403282898765024,"own":4403282898765024,"others":[]}]]
    // ["4TS6cxuBJ4AeZttG1fXtViTYLG1P93bb27eCRb76DjNZ13rp",{"total":"0x000000000000000000d9974a2325bba0","own":999999999999972,"others":[{"who":"4TkCgb1ZifsrHwd2zJ7vKTqFhTYkzaKTVRxeeezpyKX36995","value":"0x000000000000000000d609cb7e5f3bbc"}]}]
    const { event: { data: [data] } } = event;
    const data_vec = data;
    const info_data = data_vec.toArray();
    for (const idx_a in info_data) {
        const [stash_account, { total, own, others, }] = info_data[idx_a];
        // logger.info(`stash_account = ${stash_account},
        //     total = ${total},
        //     own = ${own},
        //     others = ${others},
        // `)
        logger.info(`stash_account = ${stash_account}, 
            own = ${own}, 
        `);
        const timestamp = await api.query.timestamp.now();
        await makeAresAccount(stash_account.toString());
        let record = new types_1.ImOnlineSomeOfflineEvent(`${stash_account.toString()}-${event.block.block.header.number.toString()}-${event.idx}-V${idx_a}`);
        record.whoId = stash_account.toString();
        record.event_bn = event.block.block.header.number.toBigInt();
        record.deposit = own.toBigInt();
        record.type = 'validator';
        record = fillTimeInfos(record, timestamp.toNumber());
        await record.save();
        // let record = new StakingChilledEvent(`${stash_account.toString()}-${event.idx}`)
        for (const idx_b in others.toArray()) {
            const other_acc = others[idx_b].who;
            const other_deposit = others[idx_b].value.toBigInt();
            await makeAresAccount(other_acc.toString());
            let record = new types_1.ImOnlineSomeOfflineEvent(`${other_acc.toString()}-${event.block.block.header.number.toString()}-${event.idx}-N${idx_b}`);
            record.whoId = other_acc.toString();
            record.event_bn = event.block.block.header.number.toBigInt();
            record.deposit = own.toBigInt();
            record.type = 'nominater';
            record = fillTimeInfos(record, timestamp.toNumber());
            await record.save();
        }
    }
}
exports.handleEventImOnlineSomeOffline = handleEventImOnlineSomeOffline;
//
async function handleEventSessionNewSession(event) {
    const { event: { data: [session_id] } } = event;
    const timestamp = await api.query.timestamp.now();
    let record = new types_1.SessionNewSessionEvent(`${session_id}`);
    record.event_bn = event.block.block.header.number.toBigInt();
    record.session_id = parseInt(session_id.toString());
    record = fillTimeInfos(record, timestamp.toNumber());
    // get validator set
    const validators = await api.query.session.validators();
    record.validator_count = validators.length;
    record.validator_set = [];
    validators.map(acc => {
        record.validator_set.push(acc.toHuman());
    });
    // Get staking era
    const currentEra = await api.query.staking.currentEra();
    const activeEra = await api.query.staking.activeEra();
    if (currentEra.isSome && activeEra.isSome) {
        record.staking_current_era = parseInt(currentEra.value.toString());
        record.staking_active_era = parseInt(activeEra.value.toJSON()['index']);
        // Rewards are always generated at the end of era so update the previous era's reward.
        const reward_staking_active_era = record.staking_active_era - 1 > 0 ? record.staking_active_era - 1 : 0;
        const validator_reward = await api.query.staking.erasValidatorReward(reward_staking_active_era);
        if (validator_reward.isSome) {
            const [stakingRewardObj, isNew] = await makeStakingRewardRecord(`${reward_staking_active_era}`);
            if (isNew) {
                stakingRewardObj.eras_validator_reward = validator_reward.value.toBigInt();
                stakingRewardObj.event_bn = event.block.block.header.number.toBigInt();
                stakingRewardObj.staking_era = reward_staking_active_era;
                await stakingRewardObj.save();
                let rewardObj = await getTotalAmountOfRewardRecordObj();
                rewardObj.total_reward_of_minted += BigInt(stakingRewardObj.eras_validator_reward);
                await rewardObj.save();
            }
        }
        // Get staking.erasTotalStake
        const totalStake = await api.query.staking.erasTotalStake(record.staking_active_era);
        const totalStakeRecord = await makeTotalStakeRecord(record.staking_active_era);
        totalStakeRecord.era = record.staking_active_era;
        totalStakeRecord.deposit = BigInt(totalStake.toString());
        await totalStakeRecord.save();
    }
    await record.save();
}
exports.handleEventSessionNewSession = handleEventSessionNewSession;
async function handleEventStakingRewarded(event) {
    const { event: { data: [stash_id, reward_balance] } } = event;
    const timestamp = await api.query.timestamp.now();
    const aresAcc = await makeAresAccount(stash_id.toString());
    let record = new types_1.StakingRewardedEvent(`${event.block.block.header.number.toString()}-${event.idx}`);
    record.event_bn = event.block.block.header.number.toBigInt();
    record.whoId = stash_id.toString();
    record.deposit = reward_balance.toBigInt();
    record = fillTimeInfos(record, timestamp.toNumber());
    await record.save();
    aresAcc.staking_total_reward = BigInt(aresAcc.staking_total_reward) + BigInt(record.deposit);
    await aresAcc.save();
    let rewardObj = await getTotalAmountOfRewardRecordObj();
    rewardObj.total_reward_of_claimed += BigInt(record.deposit);
    await rewardObj.save();
}
exports.handleEventStakingRewarded = handleEventStakingRewarded;
async function handleCrossChainRequestEvent(event) {
    const { event: { data: [acc, ident, kind, amount] } } = event;
    const timestamp = await api.query.timestamp.now();
    // logger.info(` #### handleCrossChainRequestEvent ${timestamp}.`, acc, ident, kind, amount);
    logger.info(` #### handleCrossChainRequestEvent 2 ${event.extrinsic.extrinsic.hash}, ${acc.toHuman()}, ${ident.toHuman()}， ${kind.toHuman()}， ${amount.toHuman()}.`);
    let record = new types_1.CrossChainRequestEvent(`${ident.toString()}`);
    record.acc = acc.toString();
    record.iden = `${ident.toString()}`;
    record.create_bn = BigInt(`${event.block.block.header.number.toString()}`);
    record.final_type = 0;
    record.tx_hash = event.extrinsic.extrinsic.hash.toString();
    record.amount = BigInt(amount.toString());
    // @ts-ignore
    if (kind.isEth) {
        record.kind = 'eth';
        // @ts-ignore
        record.dest = kind.asEth.toString();
        // @ts-ignore
    }
    else if (kind.isBsc) {
        record.kind = 'bsc';
        // @ts-ignore
        record.dest = kind.asBsc.toString();
    }
    logger.info("################### A");
    logger.info(record.acc);
    logger.info(record.iden);
    logger.info(record.amount);
    logger.info(record.kind);
    logger.info(record.dest);
    logger.info("################### B");
    await record.save();
}
exports.handleCrossChainRequestEvent = handleCrossChainRequestEvent;
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
async function handleManualBridgeCompletedListEvent(event) {
    const { event: { data: [completedList] } } = event;
    const completedJson = completedList.toString();
    const completedObjList = JSON.parse(completedJson);
    for (const idx in completedObjList) {
        const requestEvent = await types_1.CrossChainRequestEvent.get(`${completedObjList[idx].iden}`);
        if (requestEvent) {
            requestEvent.final_type = 1;
            await requestEvent.save();
        }
    }
}
exports.handleManualBridgeCompletedListEvent = handleManualBridgeCompletedListEvent;
