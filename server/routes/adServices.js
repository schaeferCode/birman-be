const router = require('express-promise-router')();

const AdServicesController = require('../controllers/adServices');
const AuthController = require('../controllers/auth');

// const passportFacebook = passport.authenticate('facebook', { session: false });

// router.route('/secret')
//   .get(passportJWT, UsersController.secret);

router.route('/adwords/go')
  .get(AuthController.verify, AuthController.verifyRole(['tenant-admin', 'root']), AdServicesController.handleGoogleOauthRedirect);

router.route('/oauth/google/callback')
  .get(AdServicesController.authenticateGoogleUser);
  
router.route('/get-google-ads-metrics')
  .get(AuthController.verify, AuthController.verifyRole(['client-admin', 'user']), AdServicesController.getGoogleAdMetrics);

router.route('/get-sub-accounts')
  .get(AuthController.verify, AuthController.verifyRole(['tenant-admin', 'root']), AdServicesController.getSubAccounts);

// router.route('/oauth/facebook')
//   .get(passportFacebook);

// router.route('/oauth/facebook/callback')
//   .get(passportFacebook, UsersController.facebookOAuth);

module.exports = router;
