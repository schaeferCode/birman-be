import * as protobufHelpers from "google-protobuf/google/protobuf/field_mask_pb";
import { Client, CallOptions } from "grpc";
import { GoogleAdsRow } from "./resources";
export declare function promisifyServiceClient(client: Client): void;
export declare function formatCallResults(resultsList: GoogleAdsRow[], fieldMask: protobufHelpers.FieldMask.AsObject): {
    [key: string]: any;
}[];
export declare function convertToProtoFormat(data: any, type: any, resource_name: string, nested_path?: string): any;
export declare function convertPathToCamelCase(str: string): string;
export declare function getFieldMask(data: any): protobufHelpers.FieldMask;
export declare function getErrorLocationPath(location: any): string;
export declare function isMutationRequest(interceptMessage: CallOptions): boolean;
export declare function safeguardMutationProtobufRequest(message: any, next: Function): void;
