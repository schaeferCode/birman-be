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

export default {
  verify: (req: Request, res: Response, next: NextFunction): void => {
    const token = verifyBearer(req.headers.authorization || '')
    if (!token) throw new Error('Auth headers sent without "Bearer"')

    const payload = JWT.verify(token, process.env.JWT_SECRET || '')
    res.locals.payload = payload
    next()
  },

  verifyRole: (validRole: string[]) => {
    return (_req: Request, res: Response, next: NextFunction): void => {
      const { role } = res.locals.payload
      let rolesAsString
      if (Array.isArray(validRole)) {
        rolesAsString = validRole.join('s and ')
      } else {
        rolesAsString = validRole
      }

      if (!rolesAsString.includes(role)) throw new Error('This page is restricted to ${rolesAsString}s only')
      next()
    }
  },
}
