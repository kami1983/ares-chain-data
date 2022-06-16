import { Entity, FunctionPropertyNames } from "@subql/types";
declare type StakingBondedEventProps = Omit<StakingBondedEvent, NonNullable<FunctionPropertyNames<StakingBondedEvent>>>;
export declare class StakingBondedEvent implements Entity {
    constructor(id: string);
    id: string;
    whoId?: string;
    deposit?: bigint;
    event_bn?: bigint;
    timestamp?: bigint;
    timestring?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<StakingBondedEvent | undefined>;
    static getByWhoId(whoId: string): Promise<StakingBondedEvent[] | undefined>;
    static create(record: StakingBondedEventProps): StakingBondedEvent;
}
export {};
