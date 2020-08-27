const { AdwordsUser } = require('node-adwords');

const { googleGetRequest } = require('../helpers/serviceHelpers');
const Tenant = require('../models/tenant');

module.exports = {
  linkGoogleAccount: async (req, res) => {
    const { refreshToken, accessToken } = req.user

    const user = new AdwordsUser({
      developerToken: '4G0ikfrjyiB8gn3Fp-s6tw',
      userAgent: 'Birman',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      access_token: accessToken
    })
    
    // get manager account id and set to user object
    const customerService = user.getService('CustomerService', 'v201809');
    const userRelatedAccounts = await googleGetRequest(customerService, 'getCustomers');
    const managerAccount = userRelatedAccounts.find((account) => {
      return account.canManageClients && account.descriptiveName === 'John Smith Test Manager Acct'
    })
    console.log({managerAccount})
    user.credentials.clientCustomerId = managerAccount.customerId;

    // save managerAccountId to tenant
    // TODO: const entity = await Tenant.findOne({ key: tenant })

    // get all sub accounts and return them to client
    const managedCustomerService = user.getService('ManagedCustomerService', 'v201809');
    const subAccounts = await googleGetRequest(managedCustomerService, 'get', {
      serviceSelector: {
        fields: ['TestAccount']
      }
    })

    res.send({ subAccounts })
  },

  createUser: async (req, res) => {
    const { email, password, tenant, role, givenName, familyName } = req.value.body;

    // check if account already exists
    const entity = await Tenant.findOne({ key: tenant }).exec();
    const foundUser = entity.users.find((user) => user.email === email);
    if (foundUser) {
      return res.status(403).send({ error: 'User already exists' });
    }

    const newUser = {
      email,
      passwordHash: password,
      givenName,
      familyName,
      role,
    };
    if (!entity.users.length) {
      entity.users.push({ ...newUser, role: 'root' });
      await entity.save();
    } else {
      entity.users.push({ ...newUser, role });
      await entity.save();
    }

    res.status(200).json({ entity }); //TODO: figure out what to send back
  },

  editUser: async (req, res) => {
    const { tenant } = req.payload.data;
    const { role, givenName, familyName, email } = req.value.body;

    const updatedTenant = await Tenant.findOneAndUpdate({key: tenant, 'users.email': email }, {'users.$.role': role, 'users.$.givenName': givenName, 'users.$.familyName': familyName }, {new: true})

    res.status(200).json({ updatedTenant }); //TODO: figure out what to send back
  },
};
