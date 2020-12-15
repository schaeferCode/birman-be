"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var adServices_1 = __importDefault(require("./routes/adServices"));
var auth_1 = __importDefault(require("./routes/auth"));
var users_1 = __importDefault(require("./routes/users"));
// const bizSdk = require('facebook-nodejs-business-sdk');
if (process.env.NODE_ENV === 'test') {
    // TODO: Create unit tests
    mongoose_1.default.connect('mongodb://localhost/APIAuthenticationTEST', { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose_1.default.set('useCreateIndex', true);
}
else {
    var uri = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@cluster0.kcgmt.mongodb.net/" + process.env.MONGO_DB_NAME + "?retryWrites=true&w=majority";
    mongoose_1.default
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(function () {
        /* eslint-disable */
        console.log('DB connection successful');
    })
        .catch(function (err) {
        /* eslint-disable */
        console.log({ err: err });
    });
}
var app = express_1.default();
app.use(cors_1.default()); // TODO: Add whitelisted domains/ports
// Middleware
if (process.env.NODE_ENV !== 'test') {
    /* eslint-disable */
    app.use(require('morgan')('dev'));
}
app.use(express_1.default.json());
// Routes
app.use('/auth', auth_1.default);
app.use('/users', users_1.default);
app.use('/ad-services', adServices_1.default);
exports.default = app;
// const accessToken = 'EAADoZAmxf8UwBAO6KhWkNopXckn25IkD5bVpogW20Fijg3FqxhrhOSUbpqDvBHWThouTiiguZAPm5W5LscBQvoFi3O2xT9qahLKwlU6mNWTtCB6PeSZCazyCRABrnkyaZBZA2mzZBSwe5mOQC5zFnAL4CqbQQJax0p8lqdRbI0vDK4vbVg0W6h6aZCjZAm1EESZAtnS9LOFf01YqZCNhyZBuQe4';
// const accountId = 'act_869172533586115';
// const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
// const AdAccount = bizSdk.AdAccount;
// const Campaign = bizSdk.Campaign;
// app.get('/facebook', (req, res) => {
//   const account = new AdAccount(accountId);
//   let campaigns;
//   account.read([AdAccount.Fields.name])
//     .then((account) =>{
//       console.log({account})
//       return account.getCampaigns([Campaign.Fields.name], { limit: 10 }) // fields array and params
//     })
//     .then((result) =>{
//       campaigns = result
//       campaigns.forEach((campaign) =>console.log(campaign.name))
//       res.end(JSON.stringify(campaigns))
//     }).catch(console.error);
// });
