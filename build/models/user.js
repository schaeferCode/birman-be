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
var mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var ROLES = ['tenant-admin', 'client-admin', 'user', 'root'];
var userSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    clientKey: {
        type: String,
        lowercase: true,
        required: function () {
            return ['client-admin', 'user'].includes(this.role);
        }
    },
    email: {
        type: String,
        index: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    familyName: {
        type: String,
        required: true,
    },
    givenName: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ROLES,
        required: true,
    },
    tenantKey: {
        type: String,
        lowercase: true,
        required: function () {
            return this.role === 'root';
        }
    }
});
// TODO: re-enable after user things are stable...
// userSchema.pre('save', async function (next) {
//   try {
//     // Generate a password hash
//     this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });
userSchema.methods.isValidPassword = function (submittedPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.passwordHash === submittedPassword
                // try {
                //   return await bcrypt.compare(submittedPassword, this.passwordHash);
                // } catch (error) {
                //   throw new Error(error);
                // }
            ];
        });
    });
};
// Create a model
var User = mongoose.model('user', userSchema);
// const rootUser = {
//   email: 'scottschaef@gmail.com',
//   familyName: 'Schaefer',
//   givenName: 'Scott',
//   passwordHash: 'easyPass',
//   role: 'root',
// }
// const tenantAdminUser = {
//   email: 'test@admin.com',
//   familyName: 'Admin',
//   givenName: 'Test',
//   passwordHash: 'easyPass',
//   role: 'tenant-admin',
//   tenantKey: 'john-smith-test-manager-acct',
// }
// const newUserCollection = [rootUser, tenantAdminUser]
// User.create(newUserCollection)
module.exports = User;