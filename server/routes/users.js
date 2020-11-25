const router = require('express-promise-router')()

const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users')
const AuthController = require('../controllers/auth')

const VALID_ROLES = ['tenant-admin', 'client-admin', 'root']
const ROLES_FOR_CLIENT_ADMIN_CREATION = ['tenant-admin', 'client-admin']

router.route('/create-client-admin')
  .post(AuthController.verify, AuthController.verifyRole(ROLES_FOR_CLIENT_ADMIN_CREATION), validateBody(schemas.newClientAdminSchema), UsersController.createClientAdmin)

// router.route('/create-client-user')
//   .post(AuthController.verify, AuthController.verifyRole(VALID_ROLES), validateBody(schemas.newUserSchema), UsersController.createUser)

// router.route('/create-tenant-admin')
//   .post(AuthController.verify, AuthController.verifyRole(VALID_ROLES), validateBody(schemas.newUserSchema), UsersController.createUser)

router.route('/edit')
  .post(AuthController.verify, AuthController.verifyRole(VALID_ROLES), validateBody(schemas.editUserSchema), UsersController.editUser)

router.route('/batch-user-creation')
  .post(AuthController.verify, AuthController.verifyRole(['tenant-admin']), validateBody(schemas.batchUserCreationSchema), UsersController.batchUserCreation)

module.exports = router
