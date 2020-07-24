const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
require('../passport'); // require passport configuration

const passportLocal = passport.authenticate('local', { session: false })
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate(
  'google',
  {
    session: false,
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    accessType: 'offline'
  }
);
const passportFacebook = passport.authenticate('facebook', { session: false });

// TODO: Will new USERS need to register?
// router.route('/register')
//   .post(validateBody(schemas.authSchema), UsersController.register);

router.route('/login')
  .post(validateBody(schemas.authSchema), passportLocal, UsersController.login);

router.route('/secret')
  .get(passportJWT, UsersController.secret);

// router.route('/oauth/google')
//   .get(passportGoogle);

// router.route('/oauth/google/callback')
//   .get(passport.authenticate('google', { session: false }), UsersController.googleOAuth);

// router.route('/oauth/facebook')
//   .get(passportFacebook);

// router.route('/oauth/facebook/callback')
//   .get(passportFacebook, UsersController.facebookOAuth);

module.exports = router;
