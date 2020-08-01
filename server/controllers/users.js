const Tenant = require('../models/tenant');

module.exports = {
  createUser: async (req, res) => {
    // check if origin is admin
    if (req.user.role === 'user') {
      return res
        .status(403)
        .send({
          error: 'New user creation is restricted to Admin users only.',
        });
    }
    const {
      email,
      password,
      tenant,
      role,
      givenName,
      familyName,
    } = req.value.body;

    // check if account already exists
    const entity = await Tenant.findOne({ key: tenant }).exec();
    const foundUser = entity.users.find((user) => user.email === email);
    if (foundUser) {
      return res.status(403).send({ error: 'User already exists' });
    }

    const newUser = {
      email,
      passwordHash: password,
      givenName,
      familyName,
      role,
    };
    if (!entity.users.length) {
      entity.users.push({ ...newUser, role: 'root' });
      await entity.save();
    } else {
      entity.users.push({ ...newUser, role });
      await entity.save();
    }

    return res.status(200).json({ entity }); // TODO: figure out what to send back
  },
};
