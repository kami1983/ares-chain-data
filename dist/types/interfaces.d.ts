export interface AskResultJson {
    price_key: string;
    create_bn: string;
    reached_type: number;
    respondents: string[];
}
export interface PreCheckStruct {
    price_key: string;
    number_val?: JsonNumberValue;
    max_offset: string;
    timestamp: string;
}
export interface JsonNumberValue {
    integer: string;
    fraction: string;
    fraction_length: string;
    exponent: string;
}
