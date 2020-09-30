const { AdwordsAuth, AdwordsReport, AdwordsUser } = require('node-adwords');
// const { GoogleAdsApi, enums } = require('google-ads-api');

const { googleGetRequest } = require('../helpers/serviceHelpers');
const Tenant = require('../models/tenant');

const ADWORDS_API_VERSION = 'v201809'

const googleAuthInstance = new AdwordsAuth({
  client_id: process.env.GOOGLE_CLIENT_ID, // app id located in google dev console
  client_secret: process.env.GOOGLE_CLIENT_SECRET, // app secret located in google dev console
}, 'http://localhost:3000/ad-services/oauth/google/callback');

// const client = new GoogleAdsApi({
  //   client_id: process.env.GOOGLE_CLIENT_ID,
  //   client_secret: process.env.GOOGLE_CLIENT_SECRET,
  //   developer_token: process.env.GOOGLE_DEV_TOKEN,
  // })
  
module.exports = {
  authenticateGoogleUser: (req, res) => {
    googleAuthInstance.getAccessTokenFromAuthorizationCode(req.query.code, async (error, { access_token, refresh_token, expiry_date }) => {
      if (error) {
        res.status(500).send({ error: { message: 'Something went wrong when trying to link your google account. Please try again.' }})
        return;
      }
      try {
        const { tenant } = JSON.parse(req.query.state);
        const entity = await Tenant.findOne({key: tenant }).exec();
        const adService = entity.adServices.find(adService => adService.name === 'google'); // TODO: fix hardcode
        if (adService) {
          adService.accessToken = access_token;
          adService.expiryDate = expiry_date;
          adService.refreshToken = refresh_token;
          await adService.save();
        } else {
          const newAdService = {
            accessToken: access_token,
            expiryDate: expiry_date,
            name: 'google', // TODO: fix hardcode
            refreshToken: refresh_token
          };
          entity.adServices.push(newAdService);
          await entity.save()
        }
        res.redirect('http://localhost:8000/user-administration/');
      } catch (error) {
        console.log({error})
        res.redirect('http://localhost:8000')
      }
    })
  },

  getGoogleAdMetrics: async (req, res) => {
    const { tenant } = req.payload;
    // get refresh and access tokens from tenant
    const entity = await Tenant.findOne({ key: tenant }).lean()
    const { refreshToken, accessToken, serviceClientId } = entity.adServices.find(adService => adService.name === 'google') // TODO: handle hardcode

    try {
      let report = new AdwordsReport({
        access_token: accessToken,
        client_id: process.env.GOOGLE_CLIENT_ID,
        clientCustomerId: 4929529639,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        developerToken: process.env.GOOGLE_DEV_TOKEN,
        refresh_token: refreshToken,
        userAgent: 'Birman'
      })

      report.getReport(ADWORDS_API_VERSION, {
        reportName: 'Custom Adgroup Performance Report',
        reportType: 'CAMPAIGN_PERFORMANCE_REPORT',
        fields: ['CampaignId', 'Impressions', 'Clicks', 'Cost'],
        filters: [
            {field: 'CampaignStatus', operator: 'IN', values: ['ENABLED', 'PAUSED']}
        ],
        dateRangeType: 'CUSTOM_DATE', //defaults to CUSTOM_DATE. startDate or endDate required for CUSTOM_DATE
        startDate: new Date("07/10/2016"),
        endDate: new Date(),
        format: 'CSV' //defaults to CSV
      }, (error, report) => {
        console.log({report})
        console.log({error});
      });
    } catch (error) {
      console.log({error})
    }
  },

  getSubAccounts: async (req, res) => {
    const { tenant } = req.payload;
    // get refresh and access tokens from tenant
    const entity = await Tenant.findOne({ key: tenant }).lean()
    const { refreshToken, accessToken } = entity.adServices.find(adService => adService.name === 'google') // TODO: handle hardcode

    try {
      const adWordsUser = new AdwordsUser({
        access_token: accessToken,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        developerToken: process.env.GOOGLE_DEV_TOKEN,
        refresh_token: refreshToken,
        userAgent: 'Birman'
      })
  
      // get manager account id (AKA serviceClientId and clientCustomerId) and set to adwordsUser object
      const customerService = adWordsUser.getService('CustomerService', ADWORDS_API_VERSION);
      const userRelatedAccounts = await googleGetRequest(customerService, 'getCustomers');
      const managerAccount = userRelatedAccounts.find(account => {
        return account.canManageClients && account.descriptiveName === 'John Smith Test Manager Acct' // TODO: handle hardcode
      })
      adWordsUser.credentials.clientCustomerId = managerAccount.customerId;

      // get all sub accounts
      const managedCustomerService = adWordsUser.getService('ManagedCustomerService', ADWORDS_API_VERSION);
      const { entries: subAccounts} = await googleGetRequest(managedCustomerService, 'get', {
        serviceSelector: {
          fields: ['TestAccount', 'AccountLabels', 'Name', 'CustomerId', 'CanManageClients']
        }
      })
      const updatedSubAccounts = subAccounts.reduce((updatedSubAccounts, subAccount) => {
        // filter manager accounts
        if (subAccount.canManageClients) return updatedSubAccounts
        // find subaccounts that exists as users and mark them as such
        const existingUser = entity.users.find(user => {
          return user.organizationName === subAccount.name.toLowerCase()
        })

        updatedSubAccounts.push(Object.assign(subAccount, existingUser, { active: !!existingUser }))
        return updatedSubAccounts
      }, [])
      res.status(200).send({ subAccounts: updatedSubAccounts });
    } catch (error) {
      console.log({error})
      res.status(404).send({ error: { message: 'Something went wrong when trying to obtain your subaccounts. Please try again.' }})
    }
  },

  handleGoogleOauthRedirect: (req, res) => {
    const URL = googleAuthInstance.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: 'https://www.googleapis.com/auth/adwords',
      state: JSON.stringify({ tenant: req.payload.tenant })
    })
    res.json({
      redirectUrl: URL
    })
  },

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
