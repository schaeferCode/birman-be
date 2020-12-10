const router = require('express-promise-router')()

const adServicesController = require('../controllers/adServices')
const auth = require('../middleware/auth')

router
  .route('/adwords/go')
  .get(auth.verify, auth.verifyRole(['tenant-admin', 'root']), adServicesController.handleGoogleOauthRedirect)

router.route('/oauth/google/callback').get(adServicesController.authenticateGoogleUser)

router
  .route('/get-google-ads-metrics')
  .get(auth.verify, auth.verifyRole(['client-admin', 'user']), adServicesController.getGoogleAdMetrics)

router
  .route('/get-sub-accounts')
  .get(auth.verify, auth.verifyRole(['tenant-admin', 'root']), adServicesController.getSubAccounts)

router
  .route('/get-all-clients')
  .get(auth.verify, auth.verifyRole([['tenant-admin']]), adServicesController.getAllClients)

module.exports = router
