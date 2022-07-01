import { SubstrateEvent } from "@subql/types";
export declare function handleEventPurchaseRewardToken(event: SubstrateEvent): Promise<void>;
export declare function handleEventEndOfAskEra(event: SubstrateEvent): Promise<void>;
export declare function handleEventAresOraclePurchasedAvgPrice(event: SubstrateEvent): Promise<void>;
export declare function handleEventAresOracleNewPurchasedRequest(event: SubstrateEvent): Promise<void>;
export declare function handleEventInsufficientCountOfValidators(event: SubstrateEvent): Promise<void>;
export declare function handleEventPayForPurchase(event: SubstrateEvent): Promise<void>;
export declare function handleEventAresOracleNewPreCheckTask(event: SubstrateEvent): Promise<void>;
export declare function handleEventAresOracleNewPreCheckResult(event: SubstrateEvent): Promise<void>;
export declare function handleEventStakingBonded(event: SubstrateEvent): Promise<void>;
export declare function handleEventStakingChilled(event: SubstrateEvent): Promise<void>;
export declare function handleEventImOnlineSomeOffline(event: SubstrateEvent): Promise<void>;
export declare function handleEventSessionNewSession(event: SubstrateEvent): Promise<void>;
export declare function handleEventStakingRewarded(event: SubstrateEvent): Promise<void>;
export declare function handleCrossChainRequestEvent(event: SubstrateEvent): Promise<void>;
export declare function handleManualBridgeCompletedListEvent(event: SubstrateEvent): Promise<void>;
