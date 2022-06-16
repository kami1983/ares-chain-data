import { Entity, FunctionPropertyNames } from "@subql/types";
declare type PayForPurchaseProps = Omit<PayForPurchase, NonNullable<FunctionPropertyNames<PayForPurchase>>>;
export declare class PayForPurchase implements Entity {
    constructor(id: string);
    id: string;
    agg_count?: number;
    dest?: string;
    event_bn?: string;
    fee: bigint;
    purchased_id?: string;
    purchased_eventId: string;
    unreserve_balance: bigint;
    who?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<PayForPurchase | undefined>;
    static getByFee(fee: bigint): Promise<PayForPurchase[] | undefined>;
    static getByPurchased_eventId(purchased_eventId: string): Promise<PayForPurchase[] | undefined>;
    static getByUnreserve_balance(unreserve_balance: bigint): Promise<PayForPurchase[] | undefined>;
    static create(record: PayForPurchaseProps): PayForPurchase;
}
export {};
