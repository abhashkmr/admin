import Router from 'koa-router'

import { getUpdateById, postUpdate } from '../controllers/updateController'

const router = new Router({ prefix: '/updates' })

router.post('/', postUpdate)
router.get('/:id',getUpdateById)

export default router.routes()
