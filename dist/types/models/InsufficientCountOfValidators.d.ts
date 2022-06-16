import { Entity, FunctionPropertyNames } from "@subql/types";
declare type InsufficientCountOfValidatorsProps = Omit<InsufficientCountOfValidators, NonNullable<FunctionPropertyNames<InsufficientCountOfValidators>>>;
export declare class InsufficientCountOfValidators implements Entity {
    constructor(id: string);
    id: string;
    event_bn?: string;
    purchased_id?: string;
    purchased_eventId: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<InsufficientCountOfValidators | undefined>;
    static getByPurchased_eventId(purchased_eventId: string): Promise<InsufficientCountOfValidators[] | undefined>;
    static create(record: InsufficientCountOfValidatorsProps): InsufficientCountOfValidators;
}
export {};
