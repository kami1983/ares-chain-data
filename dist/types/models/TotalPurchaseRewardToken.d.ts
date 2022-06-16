import { Entity, FunctionPropertyNames } from "@subql/types";
declare type TotalPurchaseRewardTokenProps = Omit<TotalPurchaseRewardToken, NonNullable<FunctionPropertyNames<TotalPurchaseRewardToken>>>;
export declare class TotalPurchaseRewardToken implements Entity {
    constructor(id: string);
    id: string;
    reward: bigint;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<TotalPurchaseRewardToken | undefined>;
    static create(record: TotalPurchaseRewardTokenProps): TotalPurchaseRewardToken;
}
export {};
