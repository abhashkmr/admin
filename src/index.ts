import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import authRoutes from './routes/authRoutes'
import updateRoutes from './routes/updateRoutes'
import userRoutes from './routes/userRoutes'

const app = new Koa()
const router = new Router()


app.use(cors())
app.use(bodyParser())
app.use(router.routes())

const PORT = process.env.PORT || 3001

app.use(authRoutes)
app.use(userRoutes)
app.use(updateRoutes)

app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`)
})
