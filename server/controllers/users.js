const generator = require('generate-password')
const _ = require('lodash/core')

const Tenant = require('../models/tenant')
const User = require('../models/user')

module.exports = {
  createUser: async (req, res) => {
    const { email, password, tenant, role, givenName, familyName } = req.value.body

    // check if account already exists
    const entity = await Tenant.findOne({ key: tenant }).exec()
    const foundUser = entity.users.find((user) => user.email === email)
    if (foundUser) {
      return res.status(403).send({ error: 'User already exists' })
    }

    const newUser = {
      email,
      passwordHash: password,
      givenName,
      familyName,
      role,
    }
    if (!entity.users.length) {
      entity.users.push({ ...newUser, role: 'root' })
      await entity.save()
    } else {
      entity.users.push({ ...newUser, role })
      await entity.save()
    }

    res.status(200).json({ entity }) //TODO: figure out what to send back
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
        clientKey: clientName.toLowerCase(),
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
        key: clientName.toLowerCase(),
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
    res.status(200).json({ User })
  }
}
