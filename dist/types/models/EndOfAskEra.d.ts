import { Entity, FunctionPropertyNames } from "@subql/types";
declare type EndOfAskEraProps = Omit<EndOfAskEra, NonNullable<FunctionPropertyNames<EndOfAskEra>>>;
export declare class EndOfAskEra implements Entity {
    constructor(id: string);
    id: string;
    event_bn?: string;
    session_index: number;
    era_num: number;
    era_income: bigint;
    era_points: bigint;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<EndOfAskEra | undefined>;
    static getBySession_index(session_index: number): Promise<EndOfAskEra[] | undefined>;
    static getByEra_num(era_num: number): Promise<EndOfAskEra[] | undefined>;
    static getByEra_income(era_income: bigint): Promise<EndOfAskEra[] | undefined>;
    static getByEra_points(era_points: bigint): Promise<EndOfAskEra[] | undefined>;
    static create(record: EndOfAskEraProps): EndOfAskEra;
}
export {};
