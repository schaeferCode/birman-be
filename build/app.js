"use strict";
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
// const bizSdk = require('facebook-nodejs-business-sdk');
if (process.env.NODE_ENV === 'test') {
    // TODO: Create unit tests
    mongoose.connect('mongodb://localhost/APIAuthenticationTEST', { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('useCreateIndex', true);
}
else {
    var uri = "mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@cluster0.kcgmt.mongodb.net/" + process.env.MONGO_DB_NAME + "?retryWrites=true&w=majority";
    mongoose
        .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(function () {
        console.log('DB connection successful');
    })
        .catch(function (err) {
        console.log({ err: err });
    });
}
var app = express();
app.use(cors()); // TODO: Add whitelisted domains/ports
// Middleware
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}
app.use(express.json());
// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/ad-services', require('./routes/adServices'));
module.exports = app;
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
