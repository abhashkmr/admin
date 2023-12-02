import Router from 'koa-router'

import { getUserById, getUsers, postUser } from '../controllers/userController'

const router = new Router({ prefix: '/user' })

router.get('/', getUsers)
router.post('/', postUser)
router.get('/:id', getUserById)

export default router.routes()
