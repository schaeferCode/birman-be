const JWT = require('jsonwebtoken')

const User = require('../models/user')

const signToken = user => {
  const { clientKey, email, familyName, givenName, id, role, tenantKey } = user
  const payload = {
    clientKey,
    email,
    familyName,
    givenName,
    id,
    role,
    tenantKey
  }

  const jwtSignOptions = {
    expiresIn: '1d',
    issuer: 'birmanAdmin',
    subject: user.id,
  }

  return JWT.sign(payload, process.env.JWT_SECRET, jwtSignOptions)
}

const verifyBearer = authorization => {
  const authorizationParts = authorization.split(' ')
  if (authorizationParts[0] === 'Bearer') {
    return authorizationParts[1]
  } else {
    return false
  }
}

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.value.body

    try {
      const user = await User.findOne({ 'email': email }).exec()

      // if not, handle that
      if (!user) return res.sendStatus(401)

      // check if password is correct
      const isPasswordValid = await user.isValidPassword(password)

      // if not, handle that
      if (!isPasswordValid) return res.sendStatus(401)

      // return signed token
      const token = signToken(user)
      res.status(200).json({ token })
    } catch (error) {
      console.log({ error })
      return res.status(401).send({ error })
    }
  },

  secret: async (req, res) => {
    res.status(200).json({ secret: 'resource' })
  },

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
