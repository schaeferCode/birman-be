"use strict";
var Joi = require('joi');
module.exports = {
    validateBody: function (schema) { return function (req, res, next) {
        var result = schema.validate(req.body);
        if (result.error) {
            return res.status(200).json(result.error);
        }
        if (!req.value) {
            req.value = {};
        }
        // put verified user and pass on req.value.body
        req.value.body = result.value;
        return next();
    }; },
    schemas: {
        asClientAdmin: {
            newClientAdminSchema: Joi.object().keys({
                email: Joi.string().email().required().lowercase(),
                familyName: Joi.string().required(),
                givenName: Joi.string().required(),
                role: Joi.string().valid('client-admin').required(),
            }),
            newClientUserSchema: Joi.object().keys({
                email: Joi.string().email().required().lowercase(),
                familyName: Joi.string().required(),
                givenName: Joi.string().required(),
                role: Joi.string().valid('user').required(),
            }),
        },
        asTenantAdmin: {
            newClientAdminSchema: Joi.object().keys({
                clientName: Joi.string().required(),
                email: Joi.string().email().required().lowercase(),
                familyName: Joi.string().required(),
                givenName: Joi.string().required(),
                role: Joi.string().valid('client-admin').required(),
                serviceUserId: Joi.string().required()
            }),
            newTenantAdminSchema: Joi.object().keys({
                email: Joi.string().email().required().lowercase(),
                familyName: Joi.string().required(),
                givenName: Joi.string().required(),
                role: Joi.string().valid('tenant-admin').required()
            }),
        },
        deleteUserSchema: Joi.object().keys({
            _id: Joi.string().required()
        }),
        editUserSchema: Joi.object().keys({
            _id: Joi.string().required(),
            email: Joi.string().required().lowercase(),
            familyName: Joi.string().required(),
            givenName: Joi.string().required(),
        }),
        authSchema: Joi.object().keys({
            email: Joi.string().email().required().lowercase(),
            password: Joi.string().required(),
        }),
        batchUserCreationSchema: Joi.object({ users: Joi.object().pattern(Joi.number(), Joi.object({
                clientName: Joi.string().required(),
                email: Joi.string().required().lowercase(),
                familyName: Joi.string().required(),
                givenName: Joi.string().required(),
                selected: Joi.bool(),
            })) })
    }
};
