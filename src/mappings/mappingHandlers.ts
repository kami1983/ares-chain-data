import {SubstrateExtrinsic, SubstrateEvent, SubstrateBlock} from "@subql/types";
import {
    AskResultJson,
    PurchasedAvgPriceEvent,
    NewPurchasedRequestEvent,
    NewPreCheckTask,
    NewPreCheckResult,
    JsonNumberValue, PreCheckStruct
} from "../types";
import {Balance} from "@polkadot/types/interfaces";

// export async function handleBlock(block: SubstrateBlock): Promise<void> {
//     //Create a new starterEntity with ID using block hash
//     let record = new PurchasedAvgPriceEvent(block.block.header.hash.toString());
//     //Record block number
//     record.field1 = block.block.header.number.toNumber();
//     await record.save();
// }

// export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
//     const record = await PurchasedAvgPriceEvent.get(extrinsic.block.block.header.hash.toString());
//     //Date type timestamp
//     record.field4 = extrinsic.block.timestamp;
//     //Boolean tyep
//     record.field5 = true;
//     await record.save();
// }

export async function handleEventAresOraclePurchasedAvgPrice(event: SubstrateEvent): Promise<void> {
    // let record = new PurchasedAvgPriceEvent(`${event.block.block.header.number.toString()}-${event.idx}`);
    const {
        event: {
            data: [purchase_id, purchase_data]
        }
    } = event;

    let record = await PurchasedAvgPriceEvent.get(`${purchase_id.toString()}`);
    if(!record){
        record = new PurchasedAvgPriceEvent(`${purchase_id.toString()}`);
    }
    record.purchased_id = purchase_id.toString();
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

    let record = new NewPurchasedRequestEvent(`${purchase_id.toString()}`);
    await makePurchase(`${purchase_id.toString()}`);
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
    record.avg_resultId = `${purchase_id.toString()}`;
    logger.info(`record ::#### ${record.request_keys}`);
    await record.save();
}

async function makePurchase(purchase_id:string):Promise<void> {
    const checkPurchase = await PurchasedAvgPriceEvent.get(purchase_id);
    if(!checkPurchase) {
        await new PurchasedAvgPriceEvent(purchase_id).save();
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
            data: [stash_account, create_bn, pre_check_struct_vec, task_at]
        }
    } = event;

    let record = new NewPreCheckResult(`${stash_account.toString()}-${task_at.toString()}`);
    record.stash_account = stash_account.toString();
    record.event_bn = event.block.block.header.number.toString();
    record.create_bn = create_bn.toString();
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
    logger.info(`Make handleEventAresOracleNewPreCheckResult - `);
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
