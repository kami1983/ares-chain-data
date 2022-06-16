import { Entity, FunctionPropertyNames } from "@subql/types";
declare type SessionNewSessionEventProps = Omit<SessionNewSessionEvent, NonNullable<FunctionPropertyNames<SessionNewSessionEvent>>>;
export declare class SessionNewSessionEvent implements Entity {
    constructor(id: string);
    id: string;
    session_id?: number;
    event_bn?: bigint;
    validator_count?: number;
    validator_set?: string[];
    staking_current_era?: number;
    staking_active_era?: number;
    timestamp?: bigint;
    timestring?: string;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<SessionNewSessionEvent | undefined>;
    static create(record: SessionNewSessionEventProps): SessionNewSessionEvent;
}
export {};
