"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class GrpcError extends Error {
    constructor(err, request) {
        const { code, details } = err;
        super(details);
        try {
            // Error.code is usually a number, so typescript really needs massaging here to accept an object.
            this.code = JSON.parse(lodash_1.get(err, "metadata._internal_repr['error-code'][0]"));
            for (const key in this.code) {
                if (this.code[key] === 0) {
                    delete this.code[key];
                }
            }
        }
        catch (err) {
            this.code = code;
        }
        this.request = request.toObject();
        this.request_id = lodash_1.get(err, "metadata._internal_repr['request-id'][0]");
        this.location = lodash_1.get(err, "metadata._internal_repr['location'][0]");
        this.failure = err;
    }
}
exports.GrpcError = GrpcError;
