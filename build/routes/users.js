"use strict";
var router = require('express-promise-router')();
var _a = require('../helpers/routeHelpers'), validateBody = _a.validateBody, schemas = _a.schemas;
var usersControllers = require('../controllers/users');
var auth = require('../middleware/auth');
var ROLES_FOR_CLIENT_ADMIN_CREATION = ['tenant-admin', 'client-admin'];
var ROLES_FOR_TENANT_ADMIN_CREATION = ['tenant-admin', 'root'];
// ********** GET REQUESTS ************ \\
router.route('/client-admin')
    .get(auth.verify, auth.verifyRole(['client-admin']), usersControllers.asClientAdmin.getUsers);
router.route('/tenant-admin')
    .get(auth.verify, auth.verifyRole(['tenant-admin']), usersControllers.asTenantAdmin.getUsers);
// ********** POST REQUESTS ************ \\
router.route('/batch-user-creation')
    .post(auth.verify, auth.verifyRole(['tenant-admin']), validateBody(schemas.batchUserCreationSchema), usersControllers.batchUserCreation);
router.route('/client-admin/create-client-admin')
    .post(auth.verify, auth.verifyRole(ROLES_FOR_CLIENT_ADMIN_CREATION), validateBody(schemas.asClientAdmin.newClientAdminSchema), usersControllers.asClientAdmin.createClientAdmin);
router.route('/client-admin/create-client-user')
    .post(auth.verify, auth.verifyRole(['client-admin']), validateBody(schemas.asClientAdmin.newClientUserSchema), usersControllers.asClientAdmin.createClientUser);
router.route('/tenant-admin/create-client-admin')
    .post(auth.verify, auth.verifyRole(ROLES_FOR_CLIENT_ADMIN_CREATION), validateBody(schemas.asTenantAdmin.newClientAdminSchema), usersControllers.asTenantAdmin.createClientAdmin);
router.route('/tenant-admin/create-tenant-admin')
    .post(auth.verify, auth.verifyRole(ROLES_FOR_TENANT_ADMIN_CREATION), validateBody(schemas.asTenantAdmin.newTenantAdminSchema), usersControllers.asTenantAdmin.createTenantAdmin);
// ********** PATCH REQUESTS ************ \\
router.route('/client-admin/edit-user')
    .patch(auth.verify, auth.verifyRole(['client-admin']), validateBody(schemas.editUserSchema), usersControllers.editUser);
router.route('/tenant-admin/edit-user')
    .patch(auth.verify, auth.verifyRole(['tenant-admin']), validateBody(schemas.editUserSchema), usersControllers.editUser);
// ********** DELETE REQUESTS ************ \\
router.route('/tenant-admin')
    .delete(auth.verify, auth.verifyRole(['tenant-admin']), validateBody(schemas.deleteUserSchema), usersControllers.deleteUser);
router.route('/client-admin')
    .delete(auth.verify, auth.verifyRole(['client-admin']), validateBody(schemas.deleteUserSchema), usersControllers.deleteUser);
module.exports = router;
