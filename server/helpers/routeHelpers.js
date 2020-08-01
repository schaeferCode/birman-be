const Joi = require('joi');

module.exports = {
  validateBody: (schema) => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result.error);
    }

    if (!req.value) {
      req.value = {};
    }
    // put verified user and pass on req.value.body
    req.value.body = result.value;
    return next();
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      tenant: Joi.string().required(),
    }),
    newUserSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      tenant: Joi.string().required(),
      role: Joi.string().default('user'),
      givenName: Joi.string().required(),
      familyName: Joi.string().required(),
    }),
  },
};
