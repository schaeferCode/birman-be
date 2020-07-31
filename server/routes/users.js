const router = require('express-promise-router')();
const passport = require('passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/create') 
  .post(validateBody(schemas.newUserSchema), passportJWT, UsersController.createUser);

module.exports = router;
  