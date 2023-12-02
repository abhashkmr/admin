import jwt from 'jsonwebtoken'

import { searchUserByMail } from '../services/userService'
import { comparePasswords } from '../utils'

const secretKey: any = process.env.SECRET_KEY

export const userLogin = async (ctx: any) => {
    const { email, password } = ctx.request.body

    if (!email || !password) throw new Error('Bad request')

    const user: any = await searchUserByMail(email)

    const payload = { userId: user.user_id }

    if (user && (await comparePasswords(password, user.password))) {
        const token = jwt.sign(payload, secretKey, {
            expiresIn: '1h',
        })
        ctx.body = { token }
        ctx.status = 200 // Set the response status to 200
    } else {
        ctx.body = 'Invalid login credentials.'
        ctx.status = 400
    }
}
