import { Entity, FunctionPropertyNames } from "@subql/types";
declare type ErasTotalStakeRecordProps = Omit<ErasTotalStakeRecord, NonNullable<FunctionPropertyNames<ErasTotalStakeRecord>>>;
export declare class ErasTotalStakeRecord implements Entity {
    constructor(id: string);
    id: string;
    era?: number;
    deposit?: bigint;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<ErasTotalStakeRecord | undefined>;
    static create(record: ErasTotalStakeRecordProps): ErasTotalStakeRecord;
}
export {};
