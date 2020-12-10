"use strict";
var router = require('express-promise-router')();
var AuthController = require('../controllers/auth');
var _a = require('../helpers/routeHelpers'), validateBody = _a.validateBody, schemas = _a.schemas;
router.route('/login').post(validateBody(schemas.authSchema), AuthController.login);
module.exports = router;
