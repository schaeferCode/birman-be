"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
class Auth {
    constructor(options) {
        this.options = options;
        this.client = this.buildOAuth2Client(this.options.clientId, this.options.clientSecret);
        this.setRefreshToken(this.options.refreshToken);
    }
    async getAccessToken() {
        if (this.options.accessTokenGetter) {
            const token_from_getter = await this.options.accessTokenGetter(this.options.clientId, this.options.clientSecret, this.options.refreshToken);
            return token_from_getter;
        }
        try {
            const { token } = await this.client.getAccessToken();
            return token;
        }
        catch (err) {
            throw new Error(`Failed to refresh access token, reason=${err.message}`);
        }
    }
    buildOAuth2Client(clientId, clientSecret) {
        return new google_auth_library_1.OAuth2Client({
            clientId,
            clientSecret,
        });
    }
    setRefreshToken(refreshToken) {
        const credentials = {
            refresh_token: refreshToken,
        };
        this.client.setCredentials(credentials);
    }
}
exports.default = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZEQUFnRTtBQWFoRSxNQUFxQixJQUFJO0lBSXZCLFlBQVksT0FBb0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2RixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjO1FBQ3pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtZQUNsQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FDMUIsQ0FBQztZQUNGLE9BQU8saUJBQWlCLENBQUM7U0FDMUI7UUFFRCxJQUFJO1lBQ0YsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNyRCxPQUFPLEtBQWUsQ0FBQztTQUN4QjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDMUU7SUFDSCxDQUFDO0lBRU8saUJBQWlCLENBQUMsUUFBZ0IsRUFBRSxZQUFvQjtRQUM5RCxPQUFPLElBQUksa0NBQVksQ0FBQztZQUN0QixRQUFRO1lBQ1IsWUFBWTtTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxlQUFlLENBQUMsWUFBb0I7UUFDMUMsTUFBTSxXQUFXLEdBQWdCO1lBQy9CLGFBQWEsRUFBRSxZQUFZO1NBQzVCLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUF6Q0QsdUJBeUNDIn0=