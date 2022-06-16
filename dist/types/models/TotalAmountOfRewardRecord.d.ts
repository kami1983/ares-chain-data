import { Entity, FunctionPropertyNames } from "@subql/types";
declare type TotalAmountOfRewardRecordProps = Omit<TotalAmountOfRewardRecord, NonNullable<FunctionPropertyNames<TotalAmountOfRewardRecord>>>;
export declare class TotalAmountOfRewardRecord implements Entity {
    constructor(id: string);
    id: string;
    total_reward_of_claimed?: bigint;
    total_reward_of_minted?: bigint;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<TotalAmountOfRewardRecord | undefined>;
    static create(record: TotalAmountOfRewardRecordProps): TotalAmountOfRewardRecord;
}
export {};
