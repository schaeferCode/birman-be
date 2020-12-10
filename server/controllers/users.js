const generator = require('generate-password')
const _ = require('lodash/core')

const Tenant = require('../models/tenant')
const User = require('../models/user')
const { convertToKey } = require('../utilities')

const SAFE_USER_KEYS = ['_id', 'email', 'familyName', 'givenName', 'role', 'tenantKey']

module.exports = {
  asClientAdmin: {
    createClientAdmin: async (req, res) => {
      const { email, familyName, givenName, role } = req.value.body
      const { clientKey, tenantKey } = req.payload

      // check if account already exists
      const foundUser = await User.findOne({ email }).lean()
      if (foundUser) {
        return res.status(403).send({ error: 'User already exists' })
      }

      const newUser = {
        clientKey,
        email,
        familyName,
        givenName,
        passwordHash: generator.generate(),
        role,
        tenantKey,
      }
      User.create(newUser)

      res.sendStatus(200)
    },

    createClientUser: async (req, res) => {
      const { email, familyName, givenName, role } = req.value.body
      const { clientKey, tenantKey } = req.payload

      // check if account already exists
      const foundUser = await User.findOne({ email }).lean()
      if (foundUser) {
        return res.status(403).send({ error: 'User already exists' })
      }

      const newUser = {
        clientKey,
        email,
        familyName,
        givenName,
        passwordHash: generator.generate(),
        role,
        tenantKey,
      }
      User.create(newUser)

      res.sendStatus(200)
    },

    getUsers: async (req, res) => {
      const { clientKey } = req.payload

      try {
        const users = await User.find({ clientKey }).lean()
        const filteredUsers = users.map((user) => {
          return _.pick(user, SAFE_USER_KEYS)
        })
        res.status(200).send(filteredUsers)
      } catch (error) {
        console.log({ error })
      }
    },
  },

  asTenantAdmin: {
    createClientAdmin: async (req, res) => {
      const { clientName, email, familyName, givenName, role, serviceUserId } = req.value.body
      const { tenantKey } = req.payload
      const clientKey = convertToKey(clientName)

      // check if account already exists
      const foundUser = await User.findOne({ email }).lean()
      if (foundUser) {
        return res.status(403).send({ error: 'User already exists' })
      }

      const newUser = {
        clientKey,
        email,
        familyName,
        givenName,
        passwordHash: generator.generate(),
        role,
        tenantKey,
      }
      User.create(newUser)

      const entity = await Tenant.findOne({ key: tenantKey }).exec()
      const foundClient = entity.clients.find((client) => client.key === clientKey)
      if (!foundClient) {
        const newClient = {
          key: clientKey,
          linkedAdServices: [
            {
              name: 'google',
              serviceUserId,
              active: true,
            },
          ],
          name: clientName,
        }
        entity.clients.push(newClient)
        entity.save()
      }

      res.sendStatus(200)
    },

    createTenantAdmin: async (req, res) => {
      const { email, familyName, givenName, role } = req.value.body
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
        tenantKey,
      }
      User.create(newUser)

      res.sendStatus(200)
    },

    getUsers: async (req, res) => {
      const { tenantKey } = req.payload

      try {
        const users = await User.find({ tenantKey }).lean()
        const filteredUsers = users.map((user) => {
          return _.pick(user, SAFE_USER_KEYS)
        })
        res.status(200).send(filteredUsers)
      } catch (error) {
        console.log({ error })
      }
    },
  },

  deleteUser: async (req, res) => {
    const { _id } = req.value.body

    try {
      await User.findByIdAndDelete(_id).exec()
      res.sendStatus(204)
    } catch (error) {
      console.log({ error })
    }
  },

  editUser: async (req, res) => {
    const { _id, email, familyName, givenName } = req.value.body

    // find user in db
    const user = await User.findById(_id).exec()
    // update user account and save
    user.email = email
    user.familyName = familyName
    user.givenName = givenName
    user.save()

    res.sendStatus(200)
  },

  batchUserCreation: async (req, res) => {
    const { tenantKey } = req.payload
    const { users } = req.value.body
    // find tenant
    const entity = await Tenant.findOne({ key: tenantKey }).exec()

    // iterate through submitted userList and create new users and new clients
    const newUsersList = _.reduce(
      users,
      (usersList, { clientName, email, familyName, givenName, tenantKey }) => {
        usersList.push({
          clientKey: convertToKey(clientName),
          email,
          familyName,
          givenName,
          passwordHash: generator.generate(),
          role: 'client-admin',
          tenantKey,
        })
        return usersList
      },
      [],
    )
    const updatedTenant = _.reduce(
      users,
      (updatedEntity, { clientName }, userId) => {
        const newDbClient = {
          key: convertToKey(clientName),
          linkedAdServices: [
            {
              name: 'google', // TODO: fix hardcode
              serviceUserId: userId,
              active: true,
            },
          ],
          name: clientName,
        }
        updatedEntity.clients.push(newDbClient)
        return updatedEntity
      },
      entity,
    )

    await User.create(newUsersList)
    await updatedTenant.save()
    res.sendStatus(200)
  },
}
