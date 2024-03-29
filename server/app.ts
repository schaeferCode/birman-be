import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import adServicesRoutes from './routes/adServices'
import authRoutes from './routes/auth'
import usersRoutes from './routes/users'

// const bizSdk = require('facebook-nodejs-business-sdk');
if (process.env.NODE_ENV === 'test') {
  // TODO: Create unit tests
  mongoose.connect('mongodb://localhost/APIAuthenticationTEST', { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.set('useCreateIndex', true)
} else {
  const uri = `mongodb+srv://${process.env['MONGO_USER']}:${process.env.MONGO_PASS}@cluster0.kcgmt.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
      /* eslint-disable */
      console.log('DB connection successful')
    })
    .catch((err) => {
      /* eslint-disable */
      console.log({ err })
    })
}

const app = express()
app.use(cors()) // TODO: Add whitelisted domains/ports

// Middleware
if (process.env.NODE_ENV !== 'test') {
  /* eslint-disable */
  app.use(require('morgan')('dev'))
}
app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/ad-services', adServicesRoutes)

export default app

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
