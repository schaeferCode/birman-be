interface TokenAuth {
    client_id: string;
    client_secret: string;
    refresh_token: string;
}
export declare const getAccessToken: ({ client_id, client_secret, refresh_token }: TokenAuth) => Promise<any>;
export {};
