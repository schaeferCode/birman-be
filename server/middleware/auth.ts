import JWT from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const verifyBearer = (authorization: string) => {
  const authorizationParts = authorization.split(' ')
  if (authorizationParts[0] === 'Bearer') {
    return authorizationParts[1]
  } else {
    return false
  }
}

module.exports = {
  verify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = verifyBearer(req.headers.authorization || '')
      if (!token) throw new Error('Auth headers sent without "Bearer"')

      const payload = await JWT.verify(token, process.env.JWT_SECRET || '')
      res.locals.payload = payload
      next()
    } catch (error) {
      res.status(401).send({ error })
    }
  },

  verifyRole: (validRole: string[]) => {
    return async (_req: Request, res: Response, next: NextFunction) => {
      const { role } = res.locals.payload
      let rolesAsString
      if (Array.isArray(validRole)) {
        rolesAsString = validRole.join('s and ')
      } else {
        rolesAsString = validRole
      }

      if (!rolesAsString.includes(role)) {
        return res.status(400).send(`This page is restricted to ${rolesAsString}s only`)
      }
      next()
    }
  },
}
