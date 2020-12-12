"use strict";
module.exports = {
    googleGetAccessTokenFromAuthorizationCode: function (googleAuthInstance, code) {
        return new Promise(function (resolve, reject) {
            googleAuthInstance.getAccessTokenFromAuthorizationCode(code, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    },
    googleGetReport: function (report, apiVersion, reportOptions) {
        return new Promise(function (resolve, reject) {
            report.getReport(apiVersion, reportOptions, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    },
    googleGetRequest: function (service, getMethod, selectors) {
        if (selectors === void 0) { selectors = {}; }
        return new Promise(function (resolve, reject) {
            service[getMethod](selectors, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    },
};
