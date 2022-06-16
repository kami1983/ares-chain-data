import { Entity, FunctionPropertyNames } from "@subql/types";
import { AskResultJson } from '../interfaces';
declare type PurchasedAvgPriceEventProps = Omit<PurchasedAvgPriceEvent, NonNullable<FunctionPropertyNames<PurchasedAvgPriceEvent>>>;
export declare class PurchasedAvgPriceEvent implements Entity {
    constructor(id: string);
    id: string;
    purchased_id?: string;
    purchased_eventId: string;
    raw_result_list?: string;
    result_list?: AskResultJson[];
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<PurchasedAvgPriceEvent | undefined>;
    static getByPurchased_eventId(purchased_eventId: string): Promise<PurchasedAvgPriceEvent[] | undefined>;
    static create(record: PurchasedAvgPriceEventProps): PurchasedAvgPriceEvent;
}
export {};
