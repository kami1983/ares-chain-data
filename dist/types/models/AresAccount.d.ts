import { Entity, FunctionPropertyNames } from "@subql/types";
declare type AresAccountProps = Omit<AresAccount, NonNullable<FunctionPropertyNames<AresAccount>>>;
export declare class AresAccount implements Entity {
    constructor(id: string);
    id: string;
    staking_total_reward?: bigint;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<AresAccount | undefined>;
    static create(record: AresAccountProps): AresAccount;
}
export {};
