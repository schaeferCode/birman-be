const router = require('express-promise-router')();
const passport = require('passport');

const AdServicesController = require('../controllers/adServices');
require('../passport'); // require passport configuration

const passportGoogle = passport.authenticate('google',
  {
    session: false,
    scope: ['https://www.googleapis.com/auth/adwords', 'https://www.googleapis.com/auth/userinfo.email'],
    accessType: 'offline'
  }
);
// const passportFacebook = passport.authenticate('facebook', { session: false });

// router.route('/secret')
//   .get(passportJWT, UsersController.secret);

router.route('/oauth/google')
  .get(passportGoogle);

router.route('/oauth/google/callback')
  .get(passport.authenticate('google', { session: false }), AdServicesController.linkGoogleAccount);

// router.route('/oauth/facebook')
//   .get(passportFacebook);

// router.route('/oauth/facebook/callback')
//   .get(passportFacebook, UsersController.facebookOAuth);

module.exports = router;
