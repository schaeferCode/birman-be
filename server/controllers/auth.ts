import JWT from 'jsonwebtoken'
import { Request, Response } from 'express'

import { IUserDocument } from '../types'
import User from '../models/user'

const signToken = (user: IUserDocument) => {
  const { clientKey, email, familyName, givenName, id, role, tenantKey } = user
  const payload = { clientKey, email, familyName, givenName, id, role, tenantKey }

  const jwtSignOptions = {
    expiresIn: '1d',
    issuer: 'birmanAdmin',
    subject: user.id,
  }

  return JWT.sign(payload, process.env.JWT_SECRET || '', jwtSignOptions)
}

export default {
  login: async (req: Request, res: Response): Promise<void> => {
    const { email, password } = res.locals.body

    try {
      const user = await User.findOne({ email: email }).exec()

      // if not, handle that
      if (!user) {
        res.sendStatus(401)
        return
      }

      // check if password is correct
      const isPasswordValid = await user.isValidPassword(password)

      // if not, handle that
      if (!isPasswordValid) {
        res.sendStatus(401)
        return
      }

      // return signed token
      const token = signToken(user)
      res.status(200).json({ token })
    } catch (error) {
      console.log({ error })
      res.status(401).send({ error })
    }
  },

  secret: async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ secret: 'resource' })
  },
}
