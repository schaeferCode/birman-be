const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const { GoogleAdsApi, enums } = require('google-ads-api');
// const bizSdk = require('facebook-nodejs-business-sdk');
// var cors = require('cors');

if (process.env.NODE_ENV === 'test') { // TODO: Create unit tests
  mongoose.connect('mongodb://localhost/APIAuthenticationTEST');
  mongoose.set('useCreateIndex', true);
} else {
  mongoose.connect('mongodb://localhost/APIAuthentication');
  mongoose.set('useCreateIndex', true);
}

const app = express();

// Middleware
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));

module.exports = app;

// const accessToken = 'EAADoZAmxf8UwBAO6KhWkNopXckn25IkD5bVpogW20Fijg3FqxhrhOSUbpqDvBHWThouTiiguZAPm5W5LscBQvoFi3O2xT9qahLKwlU6mNWTtCB6PeSZCazyCRABrnkyaZBZA2mzZBSwe5mOQC5zFnAL4CqbQQJax0p8lqdRbI0vDK4vbVg0W6h6aZCjZAm1EESZAtnS9LOFf01YqZCNhyZBuQe4';
// const accountId = 'act_869172533586115';
// const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
// const AdAccount = bizSdk.AdAccount;
// const Campaign = bizSdk.Campaign;

// const client = new GoogleAdsApi({
//   client_id: '563656359501-d558fdn4p8la4gkt0poliip8c0bjjm1d.apps.googleusercontent.com',
//   client_secret: 'kNBjrQsDgVjMOA7pnTfjtWsp',
//   developer_token: '4G0ikfrjyiB8gn3Fp-s6tw',  
// })

// const customer = client.Customer({
//   customer_account_id: '382-695-5396',
//   login_customer_id: '604-413-0368', // Optionally provide a login-customer-id
//   refresh_token: '1//05-A0pQtThg44CgYIARAAGAUSNwF-L9Ir6txWW8TfFCAjW80h4mc10Nsr-FC55jTwTErWNJvoNKmTMKgeNHMdGQzZMLpT8_Vv-Ic',
// })

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

// app.get('/google', async (req, res) => {
//   console.log({req})
//   const response = await customer.report({
//     entity: 'ad_group', 
//     attributes: ['ad_group.id', 'ad_group.name', 'ad_group.status'], 
//     metrics: ['metrics.clicks'],
//     constraints: { 'ad_group.status': enums.AdGroupStatus.ENABLED }, 
//     from_date: '2019-01-01', 
//     order_by: 'metrics.clicks', 
//     sort_order: 'desc',
//     limit: 5, 
//   })

//   res.end(JSON.stringify(response))
// })s