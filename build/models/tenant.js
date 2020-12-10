"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AD_SERVICES_LIST = ['google', 'facebook'];
var adServicesSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: AD_SERVICES_LIST,
    },
    serviceClientId: {
        type: String,
    },
    // TODO: Maybe this is needed?
    // active: {
    //   type: Boolean,
    //   default: false,
    // },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    expiryDate: {
        type: String,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    }
});
var activatedAdServices = new Schema({
    name: {
        type: String,
        enum: AD_SERVICES_LIST,
        required: true,
    },
    serviceUserId: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    dateUpdated: {
        type: Date,
        default: Date.now,
    }
});
var clientSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    key: {
        type: String,
        index: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    linkedAdServices: {
        type: [activatedAdServices]
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
});
var tenantSchema = new Schema({
    adServices: {
        type: [adServicesSchema],
    },
    clients: {
        type: [clientSchema]
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
    key: {
        type: String,
        index: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
});
// Create a model
var Tenant = mongoose.model('tenant', tenantSchema);
// const newTenant = {
//   key: 'john-smith-test-manager-acct',
//   name: 'John Smith Test Manager Acct',
// }
// Tenant.create(newTenant)
module.exports = Tenant;
