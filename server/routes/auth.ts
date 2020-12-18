import Router from 'express-promise-router'

import AuthController from '../controllers/auth'
import { validateBody, schemas } from '../helpers/routeHelpers'

const router = Router()

router.route('/login').post(validateBody(schemas.authSchema), AuthController.login)

export default router
