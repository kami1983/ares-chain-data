import { Entity, FunctionPropertyNames } from "@subql/types";
declare type StakingErasTotalStakeRecordProps = Omit<StakingErasTotalStakeRecord, NonNullable<FunctionPropertyNames<StakingErasTotalStakeRecord>>>;
export declare class StakingErasTotalStakeRecord implements Entity {
    constructor(id: string);
    id: string;
    era?: number;
    deposit?: bigint;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<StakingErasTotalStakeRecord | undefined>;
    static create(record: StakingErasTotalStakeRecordProps): StakingErasTotalStakeRecord;
}
export {};
