import { AdwordsAuth, AdwordsReport, AdwordsUser } from 'node-adwords'
import { Request, Response } from 'express'
// const { GoogleAdsApi, enums } = require('google-ads-api');
import neatCsv from 'neat-csv'

import { googleGetAccessTokenFromAuthorizationCode, googleGetReport, googleGetRequest } from '../helpers/serviceHelpers'
import Tenant from '../models/tenant'
import User from '../models/user'
import { convertToKey } from '../utilities'
import {
  IGetCustomersResponse,
  IGetManagedCustomerServiceResponse,
  IManagedCustomerServiceResponseEntry,
  IClient,
} from '../types'

const ADWORDS_API_VERSION = 'v201809'
const USER_AGENT = 'Birman'

const googleAuthInstance = new AdwordsAuth(
  {
    client_id: process.env.GOOGLE_CLIENT_ID, // app id located in google dev console
    client_secret: process.env.GOOGLE_CLIENT_SECRET, // app secret located in google dev console
  },
  `${process.env.SERVER_URL || 'http://localhost:3000'}/ad-services/oauth/google/callback`,
)

// const client = new GoogleAdsApi({
//   client_id: process.env.GOOGLE_CLIENT_ID,
//   client_secret: process.env.GOOGLE_CLIENT_SECRET,
//   developer_token: process.env.GOOGLE_DEV_TOKEN,
// })

export default {
  authenticateGoogleUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { access_token, refresh_token, expiry_date } = await googleGetAccessTokenFromAuthorizationCode(
        googleAuthInstance,
        req.query.code,
      )

      const { tenantKey } = (typeof req.query.state === 'string' && JSON.parse(req.query.state)) || ''

      const entity = await Tenant.findOne({ key: tenantKey }).exec()
      if (!entity) throw new Error('Entity not found')

      const adService = entity.adServices.find((adService) => adService.name === 'google') // TODO: fix hardcode
      if (adService) {
        adService.accessToken = access_token
        adService.expiryDate = expiry_date
        adService.refreshToken = refresh_token
        await entity.save() // TODO: Cannot save on subdoc. Must use entity object.
      } else {
        const adWordsUser = new AdwordsUser({
          access_token: access_token,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          developerToken: process.env.GOOGLE_DEV_TOKEN,
          refresh_token: refresh_token,
          userAgent: USER_AGENT,
        })

        // get manager account id (AKA serviceClientId and clientCustomerId)
        const customerService = adWordsUser.getService('CustomerService', ADWORDS_API_VERSION)
        const userRelatedAccounts: IGetCustomersResponse[] = await googleGetRequest(customerService, 'getCustomers')
        const managerAccount = userRelatedAccounts.find((account) => {
          return account.canManageClients && account.descriptiveName === entity.name
        })
        if (!managerAccount) throw new Error('No manager account found')

        const newAdService = {
          accessToken: access_token,
          expiryDate: expiry_date,
          name: 'google', // TODO: fix hardcode
          refreshToken: refresh_token,
          serviceClientId: managerAccount.customerId,
        }
        entity.adServices.push(newAdService)
        await entity.save()
      }
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:8000'}/user-administration/`)
    } catch (error) {
      console.log({ error })
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:8000'}`)
    }
  },

  getAllClients: async (req: Request, res: Response): Promise<void> => {
    const { tenantKey } = res.locals.payload

    // get access and refresh tokens
    const entity = await Tenant.findOne({ key: tenantKey }).lean()
    if (!entity) throw new Error('Entity not found')

    const adService = entity.adServices.find(({ name }) => name === 'google')
    if (!adService) throw new Error('Unknown error occurred; cannot find adService')
    const { accessToken, refreshToken, serviceClientId } = adService

    // use ManagedCustomerService to get and return all client accounts
    const adWordsUser = new AdwordsUser({
      access_token: accessToken,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      clientCustomerId: serviceClientId,
      developerToken: process.env.GOOGLE_DEV_TOKEN,
      refresh_token: refreshToken,
      userAgent: USER_AGENT,
    })
    const managedCustomerService = adWordsUser.getService('ManagedCustomerService', ADWORDS_API_VERSION)
    let { entries: allClients }: IGetManagedCustomerServiceResponse = await googleGetRequest(
      managedCustomerService,
      'get',
      {
        serviceSelector: {
          fields: ['TestAccount', 'AccountLabels', 'Name', 'CustomerId', 'CanManageClients'],
        },
      },
    )
    allClients = allClients.filter((account) => !account.canManageClients)

    // mark clients that already exist in DB
    allClients = allClients.map((account) => {
      const foundClient = entity.clients.find(({ key }) => key === convertToKey(account.name))
      if (foundClient) {
        return { ...account, active: true }
      }
      return account
    })
    res.status(200).send(allClients)
  },

  getGoogleAdMetrics: async (req: Request, res: Response): Promise<void> => {
    const { tenant, organizationName } = res.locals.payload
    // get refresh and access tokens from tenant
    const entity = await Tenant.findOne({ key: tenant }).lean()
    if (!entity) throw new Error('Entity not found')

    const adService = entity.adServices.find((adService) => adService.name === 'google') // TODO: handle hardcode
    if (!adService) throw new Error('Unknown error occurred; cannot find adService')
    const { refreshToken, accessToken } = adService

    // get serviceUserId (AKA clientCustomerId) from relative client account
    const client = entity.clients.find((client) => client.name === organizationName)
    if (!client) throw new Error('Unknown error occurred; cannot find client')

    const linkedAdService = client.linkedAdServices.find((linkedAdService) => linkedAdService.name === 'google') // TODO: handle hardcode
    if (!linkedAdService) throw new Error('Unknown error occurred; cannot find client')

    try {
      const adWordsReportInstance = new AdwordsReport({
        access_token: accessToken,
        client_id: process.env.GOOGLE_CLIENT_ID,
        clientCustomerId: linkedAdService.serviceUserId,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        developerToken: process.env.GOOGLE_DEV_TOKEN,
        refresh_token: refreshToken,
        userAgent: USER_AGENT,
      })

      const reportOptions = {
        reportName: 'Custom Adgroup Performance Report',
        reportType: 'CAMPAIGN_PERFORMANCE_REPORT',
        fields: ['CampaignId', 'Impressions', 'Clicks', 'Cost'],
        filters: [{ field: 'CampaignStatus', operator: 'IN', values: ['ENABLED', 'PAUSED'] }],
        dateRangeType: 'CUSTOM_DATE', //defaults to CUSTOM_DATE. startDate or endDate required for CUSTOM_DATE
        startDate: new Date('07/10/2016'),
        endDate: new Date(),
        format: 'CSV', //defaults to CSV
      }
      const report = await googleGetReport(adWordsReportInstance, ADWORDS_API_VERSION, reportOptions)
      const neatReport = await neatCsv(report, {
        skipLines: 1,
      })
      res.status(200).send({ neatReport })
    } catch (error) {
      console.log({ error })
    }
  },

  getSubAccounts: async (req: Request, res: Response): Promise<void> => {
    interface IModifiedSubAccount extends IManagedCustomerServiceResponseEntry, IClient {
      active: boolean
      email: string
      familyName: string
      givenName: string
    }

    const { tenantKey } = res.locals.payload
    // get all users
    const allUsers = await User.find().lean()
    // get refresh and access tokens from tenant
    const entity = await Tenant.findOne({ key: tenantKey }).lean()
    if (!entity) throw new Error('Entity not found')

    const adService = entity.adServices.find((adService) => adService.name === 'google') // TODO: handle hardcode
    if (!adService) throw new Error('Unknown error occurred; cannot find adService')
    const { refreshToken, accessToken, serviceClientId } = adService

    try {
      const adWordsUser = new AdwordsUser({
        access_token: accessToken,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        clientCustomerId: serviceClientId,
        developerToken: process.env.GOOGLE_DEV_TOKEN,
        refresh_token: refreshToken,
        userAgent: USER_AGENT,
      })
      // get all sub accounts
      const managedCustomerService = adWordsUser.getService('ManagedCustomerService', ADWORDS_API_VERSION)
      const { entries: subAccounts }: IGetManagedCustomerServiceResponse = await googleGetRequest(
        managedCustomerService,
        'get',
        {
          serviceSelector: {
            fields: ['TestAccount', 'AccountLabels', 'Name', 'CustomerId', 'CanManageClients'],
          },
        },
      )
      const updatedSubAccounts = subAccounts.reduce((updatedSubAccounts: IModifiedSubAccount[], subAccount) => {
        // filter manager accounts
        if (subAccount.canManageClients) return updatedSubAccounts
        // find subaccounts that exists as users and mark them as such
        const existingClient = entity.clients.find((client) => {
          return client.key === convertToKey(subAccount.name)
        })
        const modifiedSubAccount = Object.assign(subAccount, existingClient, {
          active: !!existingClient,
          email: '',
          familyName: '',
          givenName: '',
        })
        if (existingClient) {
          const existingUser = allUsers.find((user) => user.clientKey === existingClient.key)
          if (existingUser) {
            const { email, familyName, givenName } = existingUser
            modifiedSubAccount.email = email
            modifiedSubAccount.familyName = familyName
            modifiedSubAccount.givenName = givenName
          }
        }
        updatedSubAccounts.push(modifiedSubAccount)
        return updatedSubAccounts
      }, [])
      res.status(200).send({ subAccounts: updatedSubAccounts })
    } catch (error) {
      console.log({ error })
      res
        .status(404)
        .send({ error: { message: 'Something went wrong when trying to obtain your subaccounts. Please try again.' } })
    }
  },

  handleGoogleOauthRedirect: (req: Request, res: Response): void => {
    const URL = googleAuthInstance.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: 'https://www.googleapis.com/auth/adwords',
      state: JSON.stringify({ tenantKey: res.locals.payload.tenantKey }),
    })
    res.json({
      redirectUrl: URL,
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
}
