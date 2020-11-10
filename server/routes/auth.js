const router = require('express-promise-router')()

const AuthController = require('../controllers/auth')
const { validateBody, schemas } = require('../helpers/routeHelpers')

router.route('/login').post(validateBody(schemas.authSchema), AuthController.login)

module.exports = router
