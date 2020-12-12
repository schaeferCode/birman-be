"use strict";
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
var generator = require('generate-password');
var _ = require('lodash/core');
var Tenant = require('../models/tenant');
var User = require('../models/user');
var convertToKey = require('../utilities').convertToKey;
var SAFE_USER_KEYS = ['_id', 'email', 'familyName', 'givenName', 'role', 'tenantKey'];
module.exports = {
    asClientAdmin: {
        createClientAdmin: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, email, familyName, givenName, role, _b, clientKey, tenantKey, foundUser, newUser;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.value.body, email = _a.email, familyName = _a.familyName, givenName = _a.givenName, role = _a.role;
                        _b = res.locals.payload, clientKey = _b.clientKey, tenantKey = _b.tenantKey;
                        return [4 /*yield*/, User.findOne({ email: email }).lean()];
                    case 1:
                        foundUser = _c.sent();
                        if (foundUser) {
                            return [2 /*return*/, res.status(403).send({ error: 'User already exists' })];
                        }
                        newUser = {
                            clientKey: clientKey,
                            email: email,
                            familyName: familyName,
                            givenName: givenName,
                            passwordHash: generator.generate(),
                            role: role,
                            tenantKey: tenantKey,
                        };
                        User.create(newUser);
                        res.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); },
        createClientUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, email, familyName, givenName, role, _b, clientKey, tenantKey, foundUser, newUser;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.value.body, email = _a.email, familyName = _a.familyName, givenName = _a.givenName, role = _a.role;
                        _b = res.locals.payload, clientKey = _b.clientKey, tenantKey = _b.tenantKey;
                        return [4 /*yield*/, User.findOne({ email: email }).lean()];
                    case 1:
                        foundUser = _c.sent();
                        if (foundUser) {
                            return [2 /*return*/, res.status(403).send({ error: 'User already exists' })];
                        }
                        newUser = {
                            clientKey: clientKey,
                            email: email,
                            familyName: familyName,
                            givenName: givenName,
                            passwordHash: generator.generate(),
                            role: role,
                            tenantKey: tenantKey,
                        };
                        User.create(newUser);
                        res.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); },
        getUsers: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var clientKey, users, filteredUsers, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientKey = res.locals.payload.clientKey;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, User.find({ clientKey: clientKey }).lean()];
                    case 2:
                        users = _a.sent();
                        filteredUsers = users.map(function (user) {
                            return _.pick(user, SAFE_USER_KEYS);
                        });
                        res.status(200).send(filteredUsers);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log({ error: error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
    },
    asTenantAdmin: {
        createClientAdmin: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, clientName, email, familyName, givenName, role, serviceUserId, tenantKey, clientKey, foundUser, newUser, entity, foundClient, newClient;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.value.body, clientName = _a.clientName, email = _a.email, familyName = _a.familyName, givenName = _a.givenName, role = _a.role, serviceUserId = _a.serviceUserId;
                        tenantKey = res.locals.payload.tenantKey;
                        clientKey = convertToKey(clientName);
                        return [4 /*yield*/, User.findOne({ email: email }).lean()];
                    case 1:
                        foundUser = _b.sent();
                        if (foundUser) {
                            return [2 /*return*/, res.status(403).send({ error: 'User already exists' })];
                        }
                        newUser = {
                            clientKey: clientKey,
                            email: email,
                            familyName: familyName,
                            givenName: givenName,
                            passwordHash: generator.generate(),
                            role: role,
                            tenantKey: tenantKey,
                        };
                        User.create(newUser);
                        return [4 /*yield*/, Tenant.findOne({ key: tenantKey }).exec()];
                    case 2:
                        entity = _b.sent();
                        foundClient = entity.clients.find(function (client) { return client.key === clientKey; });
                        if (!foundClient) {
                            newClient = {
                                key: clientKey,
                                linkedAdServices: [
                                    {
                                        name: 'google',
                                        serviceUserId: serviceUserId,
                                        active: true,
                                    },
                                ],
                                name: clientName,
                            };
                            entity.clients.push(newClient);
                            entity.save();
                        }
                        res.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); },
        createTenantAdmin: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, email, familyName, givenName, role, tenantKey, foundUser, newUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.value.body, email = _a.email, familyName = _a.familyName, givenName = _a.givenName, role = _a.role;
                        tenantKey = res.locals.payload.tenantKey;
                        return [4 /*yield*/, User.findOne({ email: email }).lean()];
                    case 1:
                        foundUser = _b.sent();
                        if (foundUser) {
                            return [2 /*return*/, res.status(403).send({ error: 'User already exists' })];
                        }
                        newUser = {
                            email: email,
                            familyName: familyName,
                            givenName: givenName,
                            passwordHash: generator.generate(),
                            role: role,
                            tenantKey: tenantKey,
                        };
                        User.create(newUser);
                        res.sendStatus(200);
                        return [2 /*return*/];
                }
            });
        }); },
        getUsers: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var tenantKey, users, filteredUsers, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tenantKey = res.locals.payload.tenantKey;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, User.find({ tenantKey: tenantKey }).lean()];
                    case 2:
                        users = _a.sent();
                        filteredUsers = users.map(function (user) {
                            return _.pick(user, SAFE_USER_KEYS);
                        });
                        res.status(200).send(filteredUsers);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log({ error: error_2 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
    },
    deleteUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _id, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _id = req.value.body._id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, User.findByIdAndDelete(_id).exec()];
                case 2:
                    _a.sent();
                    res.sendStatus(204);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.log({ error: error_3 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    editUser: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _id, email, familyName, givenName, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.value.body, _id = _a._id, email = _a.email, familyName = _a.familyName, givenName = _a.givenName;
                    return [4 /*yield*/, User.findById(_id).exec()
                        // update user account and save
                    ];
                case 1:
                    user = _b.sent();
                    // update user account and save
                    user.email = email;
                    user.familyName = familyName;
                    user.givenName = givenName;
                    user.save();
                    res.sendStatus(200);
                    return [2 /*return*/];
            }
        });
    }); },
    batchUserCreation: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var tenantKey, users, entity, newUsersList, updatedTenant;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tenantKey = res.locals.payload.tenantKey;
                    users = req.value.body.users;
                    return [4 /*yield*/, Tenant.findOne({ key: tenantKey }).exec()
                        // iterate through submitted userList and create new users and new clients
                    ];
                case 1:
                    entity = _a.sent();
                    newUsersList = _.reduce(users, function (usersList, _a) {
                        var clientName = _a.clientName, email = _a.email, familyName = _a.familyName, givenName = _a.givenName, tenantKey = _a.tenantKey;
                        usersList.push({
                            clientKey: convertToKey(clientName),
                            email: email,
                            familyName: familyName,
                            givenName: givenName,
                            passwordHash: generator.generate(),
                            role: 'client-admin',
                            tenantKey: tenantKey,
                        });
                        return usersList;
                    }, []);
                    updatedTenant = _.reduce(users, function (updatedEntity, _a, userId) {
                        var clientName = _a.clientName;
                        var newDbClient = {
                            key: convertToKey(clientName),
                            linkedAdServices: [
                                {
                                    name: 'google',
                                    serviceUserId: userId,
                                    active: true,
                                },
                            ],
                            name: clientName,
                        };
                        updatedEntity.clients.push(newDbClient);
                        return updatedEntity;
                    }, entity);
                    return [4 /*yield*/, User.create(newUsersList)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, updatedTenant.save()];
                case 3:
                    _a.sent();
                    res.sendStatus(200);
                    return [2 /*return*/];
            }
        });
    }); },
};
