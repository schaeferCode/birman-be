const generator = require('generate-password')
const _ = require('lodash/core')

const Tenant = require('../models/tenant')
const User = require('../models/user')
const { convertToKey } = require('../utilities')

module.exports = {
  createClientAdmin: async (req, res) => {
    const { clientName, email, familyName, givenName, role, serviceUserId } = req.value.body
    const { tenantKey } = req.payload

    // check if account already exists
    const foundUser = await User.findOne({ email }).lean()
    if (foundUser) {
      return res.status(403).send({ error: 'User already exists' })
    }

    const newUser = {
      email,
      familyName,
      givenName,
      passwordHash: generator.generate(),
      role,
      tenantKey
    }
    User.create(newUser)

    const clientKey = convertToKey(clientName)
    const entity = await Tenant.findOne({ key: tenantKey }).exec()
    const foundClient = entity.clients.find(client => client.key === clientKey)
    if (!foundClient) {
      const newClient = {
        key: clientKey,
        linkedAdServices: [{
          name: 'google',
          serviceUserId,
          active: true
        }],
        name: clientName
      }
      entity.clients.push(newClient)
      entity.save()
    }
    
    res.sendStatus(200)
  },

  editUser: async (req, res) => {
    const { tenant } = req.payload
    const { role, givenName, familyName, email } = req.value.body

    const updatedTenant = await Tenant.findOneAndUpdate({key: tenant, 'users.email': email }, {'users.$.role': role, 'users.$.givenName': givenName, 'users.$.familyName': familyName }, {new: true})

    res.status(200).json({ updatedTenant }) //TODO: figure out what to send back
  },

  batchUserCreation: async (req, res) => {
    const { tenantKey } = req.payload
    const { users } = req.value.body
    // find tenant
    const entity = await Tenant.findOne({key: tenantKey }).exec()

    // iterate through submitted userList and create new users and new clients
    const newUsersList = _.reduce(users, (usersList, { clientName, email, familyName, givenName, tenantKey }) => {
      usersList.push({
        clientKey: convertToKey(clientName),
        email,
        familyName,
        givenName,
        passwordHash: generator.generate(),
        role: 'client-admin',
        tenantKey
      })
      return usersList
    }, [])
    const updatedTenant = _.reduce(users, (updatedEntity, { clientName,  }, userId) => {
      const newDbClient = {
        key: convertToKey(clientName),
        linkedAdServices: [{
          name: 'google', // TODO: fix hardcode
          serviceUserId: userId,
          active: true
        }],
        name: clientName
      }
      updatedEntity.clients.push(newDbClient)
      return updatedEntity
    }, entity)

    await User.create(newUsersList)
    await updatedTenant.save()
    res.sendStatus(200)
  }
}
