import { Entity, FunctionPropertyNames } from "@subql/types";
declare type StakingRewardRecordProps = Omit<StakingRewardRecord, NonNullable<FunctionPropertyNames<StakingRewardRecord>>>;
export declare class StakingRewardRecord implements Entity {
    constructor(id: string);
    id: string;
    event_bn?: bigint;
    staking_era?: number;
    eras_validator_reward?: bigint;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<StakingRewardRecord | undefined>;
    static create(record: StakingRewardRecordProps): StakingRewardRecord;
}
export {};
