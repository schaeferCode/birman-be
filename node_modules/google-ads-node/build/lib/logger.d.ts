export interface LogOptions {
    output?: "stderr" | "stdout" | "none";
    verbosity?: "debug" | "info" | "warning";
    callback?: (message: RequestLog) => void;
}
export interface RequestLog {
    request?: {
        method?: string;
        headers?: any;
        body?: any;
    };
    response?: {
        headers?: any;
        body?: any;
        status?: any;
    };
    meta?: {
        is_mutation?: boolean;
        elapsed_ms?: number;
    };
}
export declare class Logger {
    private request;
    private options;
    private start_ts;
    private end_ts;
    constructor(options: LogOptions);
    setRequestMethod(method: string): void;
    setRequestHeaders(headers: any): void;
    setRequestBody(body: any): void;
    setResponseHeaders(headers: any): void;
    setResponseBody(body: any): void;
    setResponseStatus(status: any): void;
    setRequestIsMutation(): void;
    setStartTs(): void;
    setEndTs(): void;
    calculateElapsedMs(): void;
    log(): void;
    private getDebugMessage;
    private getInfoMessage;
    private getWarningMessage;
    private resetLog;
}
