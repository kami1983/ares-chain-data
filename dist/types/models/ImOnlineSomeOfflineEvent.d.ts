import { Entity, FunctionPropertyNames } from "@subql/types";
declare type ImOnlineSomeOfflineEventProps = Omit<ImOnlineSomeOfflineEvent, NonNullable<FunctionPropertyNames<ImOnlineSomeOfflineEvent>>>;
export declare class ImOnlineSomeOfflineEvent implements Entity {
    constructor(id: string);
    id: string;
    whoId?: string;
    deposit?: bigint;
    type?: string;
    event_bn?: bigint;
    timestamp?: bigint;
    timestring?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<ImOnlineSomeOfflineEvent | undefined>;
    static getByWhoId(whoId: string): Promise<ImOnlineSomeOfflineEvent[] | undefined>;
    static create(record: ImOnlineSomeOfflineEventProps): ImOnlineSomeOfflineEvent;
}
export {};
