const JWT = require('jsonwebtoken');

const signToken = ({ user, tenant }) => {
  const { organizationName, id, email, givenName, familyName, role } = user;
  const data = {
    organizationName,
    id,
    email,
    givenName,
    familyName,
    role,
    tenant,
  };

  const jwtSignOptions = {
    issuer: 'birmanAdmin',
    subject: user.id,
    expiresIn: '24h'
  }

  return JWT.sign(data, process.env.JWT_SECRET, jwtSignOptions);
};

const verifyBearer = authorization => {
  const authorizationParts = authorization.split(' ');
  if (authorizationParts[0] === 'Bearer') {
    return authorizationParts[1]
  } else {
    return false;
  }
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
    try {
      const token = verifyBearer(req.headers.authorization);
      const payload = await JWT.verify(token, process.env.JWT_SECRET)
      req.payload = payload
      next()
    } catch (error) {
      res.status(401).send({ error });
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
        return res.status(400).send(`This page is restricted to ${rolesAsString}s only`);
      }
      next();
    }
  }
};
