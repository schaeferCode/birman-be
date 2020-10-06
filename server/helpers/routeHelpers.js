const Joi = require('joi')

module.exports = {
  validateBody: (schema) => (req, res, next) => {
    const result = Joi.validate(req.body, schema)
    if (result.error) {
      return res.status(400).json(result.error)
    }

    if (!req.value) {
      req.value = {}
    }
    // put verified user and pass on req.value.body
    req.value.body = result.value
    return next()
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      tenant: Joi.string().required(),
    }),
    newUserSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      familyName: Joi.string().required(),
      givenName: Joi.string().required(),
      organizationName: Joi.string(),
      password: Joi.string().required(),
      role: Joi.string().valid('tenant-admin', 'client-admin', 'user', 'root').default('user'),
      tenant: Joi.string().required(),
    }),
    editUserSchema: Joi.object().keys({
      email: Joi.string().required(),
      familyName: Joi.string(),
      givenName: Joi.string(),
      organizationName: Joi.string(),
      role: Joi.string(),
    }),
    batchUserCreationSchema: Joi.object({ users: Joi.object().pattern(Joi.number(), Joi.object({
      email: Joi.string().required(),
      familyName: Joi.string().required(),
      givenName: Joi.string().required(),
      name: Joi.string().required(),
      selected: Joi.bool(),
    }))})
  }
}
