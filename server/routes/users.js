const router = require('express-promise-router')()

const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users')
const AuthController = require('../controllers/auth')

const VALID_ROLES = ['tenant-admin', 'client-admin', 'root']

router.route('/create')
  .post(AuthController.verify, AuthController.verifyRole(VALID_ROLES), validateBody(schemas.newUserSchema), UsersController.createUser)

router.route('/edit')
  .post(AuthController.verify, AuthController.verifyRole(VALID_ROLES), validateBody(schemas.editUserSchema), UsersController.editUser)

router.route('/batch-user-creation')
  .post(AuthController.verify, AuthController.verifyRole(['tenant-admin']), validateBody(schemas.batchUserCreationSchema), UsersController.batchUserCreation)

module.exports = router
