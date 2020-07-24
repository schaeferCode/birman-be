interface AuthOptions {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    accessTokenGetter?(clientId?: string, clientSecret?: string, refreshToken?: string): Promise<string>;
}
export default class Auth {
    private options;
    private client;
    constructor(options: AuthOptions);
    getAccessToken(): Promise<string>;
    private buildOAuth2Client;
    private setRefreshToken;
}
export {};
