import jwt from 'jsonwebtoken'
import { Context } from 'koa'

import { findUpdatesByUserId, insertUpdate } from '../services/updateService'

const secretKey: any = process.env.SECRET_KEY

export const postUpdate = async (ctx: Context) => {
    try {
        const authorizationHeader: any = ctx.request.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const decodedToken: any = jwt.verify(token, secretKey)

        const { content }: any = ctx.request.body
        const userId = decodedToken.userId
        const insertedId = await insertUpdate(userId, content)
        ctx.status = 201
        ctx.body = { message: 'Update inserted', insertedId }
    } catch (error) {
        console.error('Error inserting update:', error)
        ctx.status = 500
        ctx.body = { error: 'Failed to insert update' }
    }
}

export const getUpdateById = async (ctx: Context) => {
    const userId: string = ctx.params.id
    try {
        const updates = await findUpdatesByUserId(userId)
        ctx.body = updates
    } catch (error) {
        ctx.body = error
    }
}
