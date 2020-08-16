const router = require('express-promise-router')();

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const AuthController = require('../controllers/auth');

router.route('/create').post(AuthController.verify, AuthController.verifyAdminRole, validateBody(schemas.newUserSchema), UsersController.createUser);
router.route('/edit').post(AuthController.verify, AuthController.verifyAdminRole, validateBody(schemas.editUserSchema), UsersController.editUser);

module.exports = router;
