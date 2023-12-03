import Router from 'koa-router'

import { userLogin } from '../controllers/authController'

const router = new Router()

router.post('/login', userLogin)

export default router.routes()
