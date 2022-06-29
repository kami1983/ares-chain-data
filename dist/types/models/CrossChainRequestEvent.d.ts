import { Entity, FunctionPropertyNames } from "@subql/types";
declare type CrossChainRequestEventProps = Omit<CrossChainRequestEvent, NonNullable<FunctionPropertyNames<CrossChainRequestEvent>>>;
export declare class CrossChainRequestEvent implements Entity {
    constructor(id: string);
    id: string;
    acc?: string;
    iden?: string;
    kind?: string;
    dest?: string;
    status?: string;
    amount: bigint;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<CrossChainRequestEvent | undefined>;
    static getByAmount(amount: bigint): Promise<CrossChainRequestEvent[] | undefined>;
    static create(record: CrossChainRequestEventProps): CrossChainRequestEvent;
}
export {};
