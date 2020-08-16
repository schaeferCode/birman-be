const JWT = require('jsonwebtoken');

const signToken = ({ user, tenant }) => {
  const { linkedAdServices, id, email, givenName, familyName, role } = user;
  const data = {
    linkedAdServices,
    id,
    email,
    givenName,
    familyName,
    role,
    tenant,
  };

  return JWT.sign(
    {
      iss: 'birmanAdmin',
      sub: user.id,
      iat: Math.floor(new Date().getTime()/1000),
      exp: Math.floor(new Date().getTime()/1000) + 86400, // current time plus 1 day
      data,
    },
    process.env.JWT_SECRET
  );
};

module.exports = {
  login: async (req, res) => {
    const { user } = req;
    const { tenant } = req.value.body;
    // Generate token
    const token = signToken({ user, tenant });
    res.status(200).json({ token });
  },

  // facebookOAuth: async (req, res) => {
  //   // Generate token
  //   const token = signToken(req.user);
  //   res.status(200).json({ token })
  // },

  secret: async (req, res) => {
    res.status(200).json({ secret: 'resource' });
  },

  verify: async (req, res, next) => {
    const { authorization: token } = req.headers;
    try {
      const payload = await JWT.verify(token, process.env.JWT_SECRET)
      console.log({payload})
      req.payload = payload
      next()
    } catch (error) {
      res.status(400).send({ error });
    }
  },

  verifyAdminRole: async (req, res, next) => {
    const { role } = req.payload.data
    if (role === 'user') {
      return res.status(400).send('User administration is restricted to Admin users only');
    }
    next();
  }
};
