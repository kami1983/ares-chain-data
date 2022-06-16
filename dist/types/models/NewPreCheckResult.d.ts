import { Entity, FunctionPropertyNames } from "@subql/types";
import { PreCheckStruct } from '../interfaces';
declare type NewPreCheckResultProps = Omit<NewPreCheckResult, NonNullable<FunctionPropertyNames<NewPreCheckResult>>>;
export declare class NewPreCheckResult implements Entity {
    constructor(id: string);
    id: string;
    stash_account: string;
    create_bn: string;
    event_bn?: string;
    work_data: PreCheckStruct[];
    result_status?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<NewPreCheckResult | undefined>;
    static getByStash_account(stash_account: string): Promise<NewPreCheckResult[] | undefined>;
    static create(record: NewPreCheckResultProps): NewPreCheckResult;
}
export {};
