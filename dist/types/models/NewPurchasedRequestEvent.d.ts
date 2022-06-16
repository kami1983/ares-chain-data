import { Entity, FunctionPropertyNames } from "@subql/types";
declare type NewPurchasedRequestEventProps = Omit<NewPurchasedRequestEvent, NonNullable<FunctionPropertyNames<NewPurchasedRequestEvent>>>;
export declare class NewPurchasedRequestEvent implements Entity {
    constructor(id: string);
    id: string;
    prepayments?: bigint;
    account_id?: string;
    offer?: bigint;
    create_bn?: string;
    submit_threshold?: string;
    max_duration?: string;
    request_keys?: string[];
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<NewPurchasedRequestEvent | undefined>;
    static create(record: NewPurchasedRequestEventProps): NewPurchasedRequestEvent;
}
export {};
