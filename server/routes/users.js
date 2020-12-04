const router = require('express-promise-router')()

const { validateBody, schemas } = require('../helpers/routeHelpers')
const usersControllers = require('../controllers/users')
const auth = require('../middleware/auth')

const ROLES_FOR_CLIENT_ADMIN_CREATION = ['tenant-admin', 'client-admin']
const ROLES_FOR_CLIENT_USERS = ['client-admin']
const ROLES_FOR_TENANT_ADMIN_CREATION = ['tenant-admin', 'root']

router.route('/client-admin')
  .get(
    auth.verify,
    auth.verifyRole(ROLES_FOR_CLIENT_USERS),
    usersControllers.asClientAdmin.getUsers
  )

router.route('/batch-user-creation')
  .post(
    auth.verify,
    auth.verifyRole(['tenant-admin']),
    validateBody(schemas.batchUserCreationSchema),
    usersControllers.batchUserCreation
  )

router.route('/client-admin/create-client-admin')
  .post(
    auth.verify,
    auth.verifyRole(ROLES_FOR_CLIENT_ADMIN_CREATION),
    validateBody(schemas.asClientAdmin.newClientAdminSchema),
    usersControllers.asClientAdmin.createClientAdmin
  )

router.route('/client-admin/create-client-user')
  .post(
    auth.verify,
    auth.verifyRole(ROLES_FOR_CLIENT_USERS),
    validateBody(schemas.asClientAdmin.newClientUserSchema),
    usersControllers.asClientAdmin.createClientUser
  )

router.route('/client-admin/edit-user')
  .patch(
    auth.verify,
    auth.verifyRole(ROLES_FOR_CLIENT_USERS),
    validateBody(schemas.asClientAdmin.editUserSchema),
    usersControllers.asClientAdmin.editUser
  )

router.route('/tenant-admin/create-client-admin')
  .post(
    auth.verify,
    auth.verifyRole(ROLES_FOR_CLIENT_ADMIN_CREATION),
    validateBody(schemas.asTenantAdmin.newClientAdminSchema),
    usersControllers.asTenantAdmin.createClientAdmin
  )

router.route('/tenant-admin/create-tenant-admin')
  .post(
    auth.verify,
    auth.verifyRole(ROLES_FOR_TENANT_ADMIN_CREATION),
    validateBody(schemas.asTenantAdmin.newTenantAdminSchema),
    usersControllers.asTenantAdmin.createTenantAdmin
  )

module.exports = router
