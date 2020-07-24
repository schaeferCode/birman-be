import { SearchGoogleAdsRequest, MutateGoogleAdsRequest } from 'google-ads-node';
export declare class GrpcError extends Error {
    readonly code: number;
    readonly request: object;
    readonly request_id: string;
    readonly location: string;
    readonly failure: any;
    constructor(err: any, request: SearchGoogleAdsRequest | MutateGoogleAdsRequest);
}
