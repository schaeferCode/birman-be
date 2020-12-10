const JWT = require('jsonwebtoken')

const User = require('../models/user')

const signToken = (user) => {
  const { clientKey, email, familyName, givenName, id, role, tenantKey } = user
  const payload = { clientKey, email, familyName, givenName, id, role, tenantKey }

  const jwtSignOptions = {
    expiresIn: '1d',
    issuer: 'birmanAdmin',
    subject: user.id,
  }

  return JWT.sign(payload, process.env.JWT_SECRET, jwtSignOptions)
}

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.value.body

    try {
      const user = await User.findOne({ email: email }).exec()

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
}
