const JWT = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');

const signToken = user => {
  return JWT.sign({
    iss: 'birmanAdmin',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1) // current time plus 1 day
  }, JWT_SECRET);
}

module.exports = {
  register: async (req, res, next) => {
    const { email, password } = req.value.body;

    // check if account already exists
    const foundUser = await User.findOne({ 'local.email': email });
    if (foundUser) {
      return res.status(403).send({ error: 'Email already exists' });
    }

    // create new user
    const newUser = new User({
      method: 'local',
      local: {
        email,
        password
      }
    });
    await newUser.save();

    //respond with token
    const token = signToken(newUser)
    res.status(200).json({ token });
  },

  login: async (req, res) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token })
  },

  secret: async (req, res) => {
    res.status(200).json({ secret: "resource" })
  }
}
