import { Entity, FunctionPropertyNames } from "@subql/types";
declare type StakingRewardedEventProps = Omit<StakingRewardedEvent, NonNullable<FunctionPropertyNames<StakingRewardedEvent>>>;
export declare class StakingRewardedEvent implements Entity {
    constructor(id: string);
    id: string;
    whoId?: string;
    event_bn?: bigint;
    deposit?: bigint;
    timestamp?: bigint;
    timestring?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<StakingRewardedEvent | undefined>;
    static getByWhoId(whoId: string): Promise<StakingRewardedEvent[] | undefined>;
    static create(record: StakingRewardedEventProps): StakingRewardedEvent;
}
export {};
