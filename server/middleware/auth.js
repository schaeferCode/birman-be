const JWT = require('jsonwebtoken')

const verifyBearer = authorization => {
  const authorizationParts = authorization.split(' ')
  if (authorizationParts[0] === 'Bearer') {
    return authorizationParts[1]
  } else {
    return false
  }
}

module.exports = {
  verify: async (req, res, next) => {
    try {
      const token = verifyBearer(req.headers.authorization)
      const payload = await JWT.verify(token, process.env.JWT_SECRET)
      req.payload = payload
      next()
    } catch (error) {
      res.status(401).send({ error })
    }
  },

  verifyRole: (validRole) => {
    return async (req, res, next) => {
      const { role } = req.payload
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
  }
}
