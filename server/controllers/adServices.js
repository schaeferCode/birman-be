const Tenant = require('../models/tenant');

module.exports = {
  linkGoogleAccount: async (req, res) => {
    
  },

  // googleOAuth: async (req, res) => {
  //   // Generate token
  //   const token = signToken(req.user);
  //   res.status(200).json({ token });
  // },


  createUser: async (req, res) => {
    const { email, password, tenant, role, givenName, familyName } = req.value.body;

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

    res.status(200).json({ entity }); //TODO: figure out what to send back
  },

  editUser: async (req, res) => {
    const { tenant } = req.payload.data;
    const { role, givenName, familyName, email } = req.value.body;

    const updatedTenant = await Tenant.findOneAndUpdate({key: tenant, 'users.email': email }, {'users.$.role': role, 'users.$.givenName': givenName, 'users.$.familyName': familyName }, {new: true})

    res.status(200).json({ updatedTenant }); //TODO: figure out what to send back
  },
};
