const router = require('express-promise-router')()

const { validateBody, schemas } = require('../helpers/routeHelpers')
const UsersController = require('../controllers/users')
const AuthController = require('../controllers/auth')

const VALID_ROLES = ['tenant-admin', 'client-admin', 'root']
const ROLES_FOR_CLIENT_ADMIN_CREATION = ['tenant-admin', 'client-admin']
const ROLES_FOR_CLIENT_USER_CREATION = ['client-admin']
const ROLES_FOR_TENANT_ADMIN_CREATION = ['tenant-admin', 'root']

router.route('/batch-user-creation')
  .post(
    AuthController.verify,
    AuthController.verifyRole(['tenant-admin']),
    validateBody(schemas.batchUserCreationSchema),
    UsersController.batchUserCreation
  )

router.route('/client-admin/create-client-admin')
  .post(
    AuthController.verify,
    AuthController.verifyRole(ROLES_FOR_CLIENT_ADMIN_CREATION),
    validateBody(schemas.asClientAdmin.newClientAdminSchema),
    UsersController.asClientAdmin.createClientAdmin
  )
  
router.route('/client-admin/create-client-user')
  .post(
    AuthController.verify,
    AuthController.verifyRole(ROLES_FOR_CLIENT_USER_CREATION),
    validateBody(schemas.asClientAdmin.newClientUserSchema),
    UsersController.asClientAdmin.createClientUser
  )

router.route('/edit')
  .post(
    AuthController.verify,
    AuthController.verifyRole(VALID_ROLES),
    validateBody(schemas.editUserSchema),
    UsersController.editUser
  )
    
router.route('/tenant-admin/create-client-admin')
  .post(
    AuthController.verify,
    AuthController.verifyRole(ROLES_FOR_CLIENT_ADMIN_CREATION),
    validateBody(schemas.asTenantAdmin.newClientAdminSchema),
    UsersController.asTenantAdmin.createClientAdmin
  )

router.route('/tenant-admin/create-tenant-admin')
  .post(
    AuthController.verify,
    AuthController.verifyRole(ROLES_FOR_TENANT_ADMIN_CREATION),
    validateBody(schemas.asTenantAdmin.newTenantAdminSchema),
    UsersController.asTenantAdmin.createTenantAdmin
  )

module.exports = router
