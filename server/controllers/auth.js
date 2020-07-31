const JWT = require('jsonwebtoken');

const signToken = ({ user, tenant }) => {
  const { linkedAdServices, id, email, givenName, familyName, role } = user;
  const data = { linkedAdServices, id, email, givenName, familyName, role, tenant };

  return JWT.sign({
    iss: 'birmanAdmin',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1), // current time plus 1 day
    data
  }, process.env.JWT_SECRET);
}

module.exports = {
  login: async (req, res) => {
    const { user } = req;
    const { tenant } = req.value.body;
    // Generate token
    const token = signToken({ user, tenant: tenant });
    res.status(200).json({ token });
  },

  // googleOAuth: async (req, res) => {
  //   // Generate token
  //   const token = signToken(req.user);
  //   res.status(200).json({ token });
  // },

  // facebookOAuth: async (req, res) => {
  //   // Generate token
  //   const token = signToken(req.user);
  //   res.status(200).json({ token })
  // },

  secret: async (req, res) => {
    res.status(200).json({ secret: "resource" })
  }
}
