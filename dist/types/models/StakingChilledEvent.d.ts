import { Entity, FunctionPropertyNames } from "@subql/types";
declare type StakingChilledEventProps = Omit<StakingChilledEvent, NonNullable<FunctionPropertyNames<StakingChilledEvent>>>;
export declare class StakingChilledEvent implements Entity {
    constructor(id: string);
    id: string;
    whoId?: string;
    event_bn?: bigint;
    timestamp?: bigint;
    timestring?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<StakingChilledEvent | undefined>;
    static getByWhoId(whoId: string): Promise<StakingChilledEvent[] | undefined>;
    static create(record: StakingChilledEventProps): StakingChilledEvent;
}
export {};
