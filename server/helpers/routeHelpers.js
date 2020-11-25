const Joi = require('joi')

module.exports = {
  validateBody: (schema) => (req, res, next) => {
    const result = schema.validate(req.body)
    if (result.error) {
      console.log('errro', result)
      return res.status(200).json(result.error)
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
      email: Joi.string().email().required().lowercase(),
      password: Joi.string().required(),
    }),
    newClientAdminSchema: Joi.object().keys({
      clientName: Joi.string().required(),
      email: Joi.string().email().required().lowercase(),
      familyName: Joi.string().required(),
      givenName: Joi.string().required(),
      role: Joi.string().valid('client-admin').required(),
      serviceUserId: Joi.string().required()
    }),
    newTenantAdminSchema: Joi.object().keys({
      email: Joi.string().email().required().lowercase(),
      familyName: Joi.string().required(),
      givenName: Joi.string().required(),
      role: Joi.string().valid('tenant-admin').required()
    }),
    newUserSchema: Joi.object().keys({
      clientName: Joi.when('role', {
        is: Joi.string().valid('client-admin', 'user'),
        then: Joi.string().required()
      }),
      email: Joi.string().email().required().lowercase(),
      familyName: Joi.string().required(),
      givenName: Joi.string().required(),
      role: Joi.string().valid('tenant-admin', 'client-admin', 'user', 'root').required(),
      serviceUserId: Joi.when('role', {
        is: Joi.string().valid('client-admin'),
        then: Joi.string().required()
      })
    }),
    editUserSchema: Joi.object().keys({
      email: Joi.string().required().lowercase(),
      familyName: Joi.string(),
      givenName: Joi.string(),
      organizationName: Joi.string(),
      role: Joi.string(),
    }),
    batchUserCreationSchema: Joi.object({ users: Joi.object().pattern(Joi.number(), Joi.object({
      clientName: Joi.string().required(),
      email: Joi.string().required().lowercase(),
      familyName: Joi.string().required(),
      givenName: Joi.string().required(),
      selected: Joi.bool(),
    }))})
  }
}
