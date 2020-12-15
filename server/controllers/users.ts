import generator from 'generate-password'
import _ from 'lodash'
import { Request, Response } from 'express'

import Tenant from '../models/tenant'
import User from '../models/user'
import { convertToKey } from '../utilities'
import { IUser, ITenantDocument } from '../types'

const SAFE_USER_KEYS = ['_id', 'email', 'familyName', 'givenName', 'role', 'tenantKey']

module.exports = {
  asClientAdmin: {
    createClientAdmin: async (req: Request, res: Response): Promise<void> => {
      const { email, familyName, givenName, role } = res.locals.body
      const { clientKey, tenantKey } = res.locals.payload

      // check if account already exists
      const foundUser = await User.findOne({ email }).lean()
      if (foundUser) {
        res.status(403).send({ error: 'User already exists' })
        return
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

    createClientUser: async (req: Request, res: Response): Promise<void> => {
      const { email, familyName, givenName, role } = res.locals.body
      const { clientKey, tenantKey } = res.locals.payload

      // check if account already exists
      const foundUser = await User.findOne({ email }).lean()
      if (foundUser) {
        res.status(403).send({ error: 'User already exists' })
        return
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

    getUsers: async (req: Request, res: Response): Promise<void> => {
      const { clientKey } = res.locals.payload

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
    createClientAdmin: async (req: Request, res: Response): Promise<void> => {
      const { clientName, email, familyName, givenName, role, serviceUserId } = res.locals.body
      const { tenantKey } = res.locals.payload
      const clientKey = convertToKey(clientName)

      // check if account already exists
      const foundUser = await User.findOne({ email }).lean()
      if (foundUser) {
        res.status(403).send({ error: 'User already exists' })
        return
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
      if (!entity) throw new Error('Entity not found')

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

    createTenantAdmin: async (req: Request, res: Response): Promise<void> => {
      const { email, familyName, givenName, role } = res.locals.body
      const { tenantKey } = res.locals.payload

      // check if account already exists
      const foundUser = await User.findOne({ email }).lean()
      if (foundUser) {
        res.status(403).send({ error: 'User already exists' })
        return
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

    getUsers: async (req: Request, res: Response): Promise<void> => {
      const { tenantKey } = res.locals.payload

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

  deleteUser: async (req: Request, res: Response): Promise<void> => {
    const { _id } = res.locals.body

    try {
      await User.findByIdAndDelete(_id).exec()
      res.sendStatus(204)
    } catch (error) {
      console.log({ error })
    }
  },

  editUser: async (req: Request, res: Response): Promise<void> => {
    const { _id, email, familyName, givenName } = res.locals.body

    // find user in db
    const user = await User.findById(_id).exec()
    if (!user) throw new Error('User not found')
    // update user account and save
    user.email = email
    user.familyName = familyName
    user.givenName = givenName
    user.save()

    res.sendStatus(200)
  },

  batchUserCreation: async (req: Request, res: Response): Promise<void> => {
    interface INewUser extends IUser {
      clientName: string
    }

    const { tenantKey } = res.locals.payload
    const { users } = res.locals.body
    // find tenant
    const entity = await Tenant.findOne({ key: tenantKey }).exec()
    if (!entity) throw new Error('Entity not found')

    // iterate through submitted userList and create new users and new clients
    const newUsersList = _.reduce(
      users,
      (usersList: IUser[], { clientName, email, familyName, givenName, tenantKey }: INewUser) => {
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
      (updatedEntity: ITenantDocument, { clientName }: { clientName: string }, userId: string) => {
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
