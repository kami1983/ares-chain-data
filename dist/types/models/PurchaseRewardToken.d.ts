import { Entity, FunctionPropertyNames } from "@subql/types";
declare type PurchaseRewardTokenProps = Omit<PurchaseRewardToken, NonNullable<FunctionPropertyNames<PurchaseRewardToken>>>;
export declare class PurchaseRewardToken implements Entity {
    constructor(id: string);
    id: string;
    event_bn?: string;
    era_num: number;
    who: string;
    reward: bigint;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<PurchaseRewardToken | undefined>;
    static getByEra_num(era_num: number): Promise<PurchaseRewardToken[] | undefined>;
    static getByWho(who: string): Promise<PurchaseRewardToken[] | undefined>;
    static getByReward(reward: bigint): Promise<PurchaseRewardToken[] | undefined>;
    static create(record: PurchaseRewardTokenProps): PurchaseRewardToken;
}
export {};
