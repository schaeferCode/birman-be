const { AdwordsUser } = require('node-adwords');
// const { GoogleAdsApi, enums } = require('google-ads-api');
const Redis = require("ioredis");

const { googleGetRequest } = require('../helpers/serviceHelpers');
// const Tenant = require('../models/tenant');

const ADWORDS_API_VERSION = 'v201809'

const redis = new Redis();
// const client = new GoogleAdsApi({
  //   client_id: process.env.GOOGLE_CLIENT_ID,
  //   client_secret: process.env.GOOGLE_CLIENT_SECRET,
  //   developer_token: process.env.GOOGLE_DEV_TOKEN,
  // })
  
module.exports = {
  linkGoogleAccount: async (req, res) => {
    const { refreshToken, accessToken } = req.user
    const adWordsUser = new AdwordsUser({
      access_token: accessToken,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      developerToken: process.env.GOOGLE_DEV_TOKEN,
      refresh_token: refreshToken,
      userAgent: 'Birman'
    })

    // get manager account id and set to adwordsUser object
    const customerService = adWordsUser.getService('CustomerService', ADWORDS_API_VERSION);
    const userRelatedAccounts = await googleGetRequest(customerService, 'getCustomers');
    const managerAccount = userRelatedAccounts.find((account) => {
      return account.canManageClients && account.descriptiveName === 'John Smith Test Manager Acct'
    })
    adWordsUser.credentials.clientCustomerId = managerAccount.customerId;

    // get all sub accounts and set to redis
    const managedCustomerService = adWordsUser.getService('ManagedCustomerService', ADWORDS_API_VERSION);
    const subAccounts = await googleGetRequest(managedCustomerService, 'get', {
      serviceSelector: {
        fields: ['TestAccount', 'AccountLabels', 'Name', 'CustomerId']
      }
    })
    console.log('{subAccounts}', JSON.stringify(subAccounts))

    redis.set(managerAccount.customerId, JSON.stringify(subAccounts))

    res.redirect(`http://localhost:8000/user-administration/add-users-batch?managerId=${managerAccount.customerId}`)
  }

  // getSubAccounts: async (req, res) => {
  //   const { managerCustomerId, clientCustomerId } = req.subAccountData.links[0];
  //   const { refreshToken } = req.user
  //   console.log({managerCustomerId}, {clientCustomerId})
  //   const customer = client.Customer({
  //     customer_account_id: clientCustomerId,
  //     login_customer_id: managerCustomerId, // Optionally provide a login-customer-id
  //     refresh_token: refreshToken,
  //   })
  //   // const response = await customer.report({
  //   //   entity: 'ad_group',
  //   //   attributes: ['ad_group.id', 'ad_group.name', 'ad_group.status'],
  //   //   metrics: ['metrics.clicks'],
  //   //   constraints: { 'ad_group.status': enums.AdGroupStatus.ENABLED },
  //   //   from_date: '2019-01-01',
  //   //   order_by: 'metrics.clicks',
  //   //   sort_order: 'desc',
  //   //   limit: 5,
  //   // })
  //   const response = await customer.get(clientCustomerId)

  //   console.log({response})

  // }
};
