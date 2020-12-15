"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_adwords_1 = require("node-adwords");
// const { GoogleAdsApi, enums } = require('google-ads-api');
var neat_csv_1 = __importDefault(require("neat-csv"));
var serviceHelpers_1 = require("../helpers/serviceHelpers");
var tenant_1 = __importDefault(require("../models/tenant"));
var user_1 = __importDefault(require("../models/user"));
var utilities_1 = require("../utilities");
var ADWORDS_API_VERSION = 'v201809';
var USER_AGENT = 'Birman';
var googleAuthInstance = new node_adwords_1.AdwordsAuth({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
}, (process.env.SERVER_URL || 'http://localhost:3000') + "/ad-services/oauth/google/callback");
// const client = new GoogleAdsApi({
//   client_id: process.env.GOOGLE_CLIENT_ID,
//   client_secret: process.env.GOOGLE_CLIENT_SECRET,
//   developer_token: process.env.GOOGLE_DEV_TOKEN,
// })
exports.default = {
    authenticateGoogleUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, access_token, refresh_token, expiry_date, tenantKey, entity_1, adService, adWordsUser, customerService, userRelatedAccounts, managerAccount, newAdService, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, serviceHelpers_1.googleGetAccessTokenFromAuthorizationCode(googleAuthInstance, req.query.code)];
                case 1:
                    _a = _b.sent(), access_token = _a.access_token, refresh_token = _a.refresh_token, expiry_date = _a.expiry_date;
                    tenantKey = ((typeof req.query.state === 'string' && JSON.parse(req.query.state)) || '').tenantKey;
                    return [4 /*yield*/, tenant_1.default.findOne({ key: tenantKey }).exec()];
                case 2:
                    entity_1 = _b.sent();
                    if (!entity_1)
                        throw new Error('Entity not found');
                    adService = entity_1.adServices.find(function (adService) { return adService.name === 'google'; }) // TODO: fix hardcode
                    ;
                    if (!adService) return [3 /*break*/, 4];
                    adService.accessToken = access_token;
                    adService.expiryDate = expiry_date;
                    adService.refreshToken = refresh_token;
                    return [4 /*yield*/, entity_1.save()]; // TODO: Cannot save on subdoc. Must use entity object.
                case 3:
                    _b.sent(); // TODO: Cannot save on subdoc. Must use entity object.
                    return [3 /*break*/, 7];
                case 4:
                    adWordsUser = new node_adwords_1.AdwordsUser({
                        access_token: access_token,
                        client_id: process.env.GOOGLE_CLIENT_ID,
                        client_secret: process.env.GOOGLE_CLIENT_SECRET,
                        developerToken: process.env.GOOGLE_DEV_TOKEN,
                        refresh_token: refresh_token,
                        userAgent: USER_AGENT,
                    });
                    customerService = adWordsUser.getService('CustomerService', ADWORDS_API_VERSION);
                    return [4 /*yield*/, serviceHelpers_1.googleGetRequest(customerService, 'getCustomers')];
                case 5:
                    userRelatedAccounts = _b.sent();
                    managerAccount = userRelatedAccounts.find(function (account) {
                        return account.canManageClients && account.descriptiveName === entity_1.name;
                    });
                    if (!managerAccount)
                        throw new Error('No manager account found');
                    newAdService = {
                        accessToken: access_token,
                        expiryDate: expiry_date,
                        name: 'google',
                        refreshToken: refresh_token,
                        serviceClientId: managerAccount.customerId,
                    };
                    entity_1.adServices.push(newAdService);
                    return [4 /*yield*/, entity_1.save()];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    res.redirect((process.env.FRONTEND_URL || 'http://localhost:8000') + "/user-administration/");
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _b.sent();
                    console.log({ error: error_1 });
                    res.redirect("" + (process.env.FRONTEND_URL || 'http://localhost:8000'));
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); },
    getAllClients: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var tenantKey, entity, adService, accessToken, refreshToken, serviceClientId, adWordsUser, managedCustomerService, allClients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tenantKey = res.locals.payload.tenantKey;
                    return [4 /*yield*/, tenant_1.default.findOne({ key: tenantKey }).lean()];
                case 1:
                    entity = _a.sent();
                    if (!entity)
                        throw new Error('Entity not found');
                    adService = entity.adServices.find(function (_a) {
                        var name = _a.name;
                        return name === 'google';
                    });
                    if (!adService)
                        throw new Error('Unknown error occurred; cannot find adService');
                    accessToken = adService.accessToken, refreshToken = adService.refreshToken, serviceClientId = adService.serviceClientId;
                    adWordsUser = new node_adwords_1.AdwordsUser({
                        access_token: accessToken,
                        client_id: process.env.GOOGLE_CLIENT_ID,
                        client_secret: process.env.GOOGLE_CLIENT_SECRET,
                        clientCustomerId: serviceClientId,
                        developerToken: process.env.GOOGLE_DEV_TOKEN,
                        refresh_token: refreshToken,
                        userAgent: USER_AGENT,
                    });
                    managedCustomerService = adWordsUser.getService('ManagedCustomerService', ADWORDS_API_VERSION);
                    return [4 /*yield*/, serviceHelpers_1.googleGetRequest(managedCustomerService, 'get', {
                            serviceSelector: {
                                fields: ['TestAccount', 'AccountLabels', 'Name', 'CustomerId', 'CanManageClients'],
                            },
                        })];
                case 2:
                    allClients = (_a.sent()).entries;
                    allClients = allClients.filter(function (account) { return !account.canManageClients; });
                    // mark clients that already exist in DB
                    allClients = allClients.map(function (account) {
                        var foundClient = entity.clients.find(function (_a) {
                            var key = _a.key;
                            return key === utilities_1.convertToKey(account.name);
                        });
                        if (foundClient) {
                            return __assign(__assign({}, account), { active: true });
                        }
                        return account;
                    });
                    res.status(200).send(allClients);
                    return [2 /*return*/];
            }
        });
    }); },
    getGoogleAdMetrics: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, tenant, organizationName, entity, adService, refreshToken, accessToken, client, linkedAdService, adWordsReportInstance, reportOptions, report, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = res.locals.payload, tenant = _a.tenant, organizationName = _a.organizationName;
                    return [4 /*yield*/, tenant_1.default.findOne({ key: tenant }).lean()];
                case 1:
                    entity = _b.sent();
                    if (!entity)
                        throw new Error('Entity not found');
                    adService = entity.adServices.find(function (adService) { return adService.name === 'google'; }) // TODO: handle hardcode
                    ;
                    if (!adService)
                        throw new Error('Unknown error occurred; cannot find adService');
                    refreshToken = adService.refreshToken, accessToken = adService.accessToken;
                    client = entity.clients.find(function (client) { return client.name === organizationName; });
                    if (!client)
                        throw new Error('Unknown error occurred; cannot find client');
                    linkedAdService = client.linkedAdServices.find(function (linkedAdService) { return linkedAdService.name === 'google'; }) // TODO: handle hardcode
                    ;
                    if (!linkedAdService)
                        throw new Error('Unknown error occurred; cannot find client');
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    adWordsReportInstance = new node_adwords_1.AdwordsReport({
                        access_token: accessToken,
                        client_id: process.env.GOOGLE_CLIENT_ID,
                        clientCustomerId: linkedAdService.serviceUserId,
                        client_secret: process.env.GOOGLE_CLIENT_SECRET,
                        developerToken: process.env.GOOGLE_DEV_TOKEN,
                        refresh_token: refreshToken,
                        userAgent: USER_AGENT,
                    });
                    reportOptions = {
                        reportName: 'Custom Adgroup Performance Report',
                        reportType: 'CAMPAIGN_PERFORMANCE_REPORT',
                        fields: ['CampaignId', 'Impressions', 'Clicks', 'Cost'],
                        filters: [{ field: 'CampaignStatus', operator: 'IN', values: ['ENABLED', 'PAUSED'] }],
                        dateRangeType: 'CUSTOM_DATE',
                        startDate: new Date('07/10/2016'),
                        endDate: new Date(),
                        format: 'CSV',
                    };
                    return [4 /*yield*/, serviceHelpers_1.googleGetReport(adWordsReportInstance, ADWORDS_API_VERSION, reportOptions)];
                case 3:
                    report = _b.sent();
                    return [4 /*yield*/, neat_csv_1.default(report, {
                            skipLines: 1,
                        })];
                case 4:
                    report = _b.sent();
                    res.status(200).send({ report: report });
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _b.sent();
                    console.log({ error: error_2 });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    getSubAccounts: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var tenantKey, allUsers, entity, adService, refreshToken, accessToken, serviceClientId, adWordsUser, managedCustomerService, subAccounts, updatedSubAccounts, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tenantKey = res.locals.payload.tenantKey;
                    return [4 /*yield*/, user_1.default.find().lean()
                        // get refresh and access tokens from tenant
                    ];
                case 1:
                    allUsers = _a.sent();
                    return [4 /*yield*/, tenant_1.default.findOne({ key: tenantKey }).lean()];
                case 2:
                    entity = _a.sent();
                    if (!entity)
                        throw new Error('Entity not found');
                    adService = entity.adServices.find(function (adService) { return adService.name === 'google'; }) // TODO: handle hardcode
                    ;
                    if (!adService)
                        throw new Error('Unknown error occurred; cannot find adService');
                    refreshToken = adService.refreshToken, accessToken = adService.accessToken, serviceClientId = adService.serviceClientId;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    adWordsUser = new node_adwords_1.AdwordsUser({
                        access_token: accessToken,
                        client_id: process.env.GOOGLE_CLIENT_ID,
                        client_secret: process.env.GOOGLE_CLIENT_SECRET,
                        clientCustomerId: serviceClientId,
                        developerToken: process.env.GOOGLE_DEV_TOKEN,
                        refresh_token: refreshToken,
                        userAgent: USER_AGENT,
                    });
                    managedCustomerService = adWordsUser.getService('ManagedCustomerService', ADWORDS_API_VERSION);
                    return [4 /*yield*/, serviceHelpers_1.googleGetRequest(managedCustomerService, 'get', {
                            serviceSelector: {
                                fields: ['TestAccount', 'AccountLabels', 'Name', 'CustomerId', 'CanManageClients'],
                            },
                        })];
                case 4:
                    subAccounts = (_a.sent()).entries;
                    updatedSubAccounts = subAccounts.reduce(function (updatedSubAccounts, subAccount) {
                        // filter manager accounts
                        if (subAccount.canManageClients)
                            return updatedSubAccounts;
                        // find subaccounts that exists as users and mark them as such
                        var existingClient = entity.clients.find(function (client) {
                            return client.key === utilities_1.convertToKey(subAccount.name);
                        });
                        var modifiedSubAccount = Object.assign(subAccount, existingClient, {
                            active: !!existingClient,
                            email: '',
                            familyName: '',
                            givenName: '',
                        });
                        if (existingClient) {
                            var existingUser = allUsers.find(function (user) { return user.clientKey === existingClient.key; });
                            if (existingUser) {
                                var email = existingUser.email, familyName = existingUser.familyName, givenName = existingUser.givenName;
                                modifiedSubAccount.email = email;
                                modifiedSubAccount.familyName = familyName;
                                modifiedSubAccount.givenName = givenName;
                            }
                        }
                        updatedSubAccounts.push(modifiedSubAccount);
                        return updatedSubAccounts;
                    }, []);
                    res.status(200).send({ subAccounts: updatedSubAccounts });
                    return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    console.log({ error: error_3 });
                    res
                        .status(404)
                        .send({ error: { message: 'Something went wrong when trying to obtain your subaccounts. Please try again.' } });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    handleGoogleOauthRedirect: function (req, res) {
        var URL = googleAuthInstance.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: 'https://www.googleapis.com/auth/adwords',
            state: JSON.stringify({ tenantKey: res.locals.payload.tenantKey }),
        });
        res.json({
            redirectUrl: URL,
        });
    },
};
