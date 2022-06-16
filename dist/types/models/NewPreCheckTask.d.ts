import { Entity, FunctionPropertyNames } from "@subql/types";
declare type NewPreCheckTaskProps = Omit<NewPreCheckTask, NonNullable<FunctionPropertyNames<NewPreCheckTask>>>;
export declare class NewPreCheckTask implements Entity {
    constructor(id: string);
    id: string;
    stash_account: string;
    ares_account: string;
    create_bn: string;
    event_bn: string;
    check_resultId: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<NewPreCheckTask | undefined>;
    static getByStash_account(stash_account: string): Promise<NewPreCheckTask[] | undefined>;
    static getByCheck_resultId(check_resultId: string): Promise<NewPreCheckTask[] | undefined>;
    static create(record: NewPreCheckTaskProps): NewPreCheckTask;
}
export {};
