const router = require('express-promise-router')();
const passport = require('passport');
const { GoogleAdsApi, enums } = require('google-ads-api');

const AdServicesController = require('../controllers/adServices');
// const { validateBody, schemas } = require('../helpers/routeHelpers');
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

router.route('/oauth/google') // TODO: add authcontroller.verify()
  .get(passportGoogle);

router.route('/oauth/google/callback')
  .get(passport.authenticate('google', { session: false }), AdServicesController.linkGoogleAccount);

// router.route('/oauth/facebook')
//   .get(passportFacebook);

// router.route('/oauth/facebook/callback')
//   .get(passportFacebook, UsersController.facebookOAuth);

module.exports = router;


// const client = new GoogleAdsApi({
//   client_id: '563656359501-d558fdn4p8la4gkt0poliip8c0bjjm1d.apps.googleusercontent.com',
//   client_secret: 'kNBjrQsDgVjMOA7pnTfjtWsp',
//   developer_token: '4G0ikfrjyiB8gn3Fp-s6tw',
// })

// const customer = client.Customer({
//   customer_account_id: '382-695-5396',
//   login_customer_id: '604-413-0368', // Optionally provide a login-customer-id
//   refresh_token: '1//05-A0pQtThg44CgYIARAAGAUSNwF-L9Ir6txWW8TfFCAjW80h4mc10Nsr-FC55jTwTErWNJvoNKmTMKgeNHMdGQzZMLpT8_Vv-Ic',
// })

// app.get('/google', async (req, res) => {
//   console.log({req})
//   const response = await customer.report({
//     entity: 'ad_group',
//     attributes: ['ad_group.id', 'ad_group.name', 'ad_group.status'],
//     metrics: ['metrics.clicks'],
//     constraints: { 'ad_group.status': enums.AdGroupStatus.ENABLED },
//     from_date: '2019-01-01',
//     order_by: 'metrics.clicks',
//     sort_order: 'desc',
//     limit: 5,
//   })

//   res.end(JSON.stringify(response))
// })