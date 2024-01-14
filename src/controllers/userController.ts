import { Context } from 'koa'

import {
    getAllUsers,
    insertUser,
    searchUserById,
} from '../services/userService'
import { hashPassword, validateEmail } from '../utils'

export const getUsers = async (ctx: Context) => {
    try {
        const users = await getAllUsers()
        const userRes = users.map(({ name, email }) => ({ name, email }))
        ctx.body = userRes
    } catch (error) {
        ctx.body = error
    }
}

export const postUser = async (ctx: Context) => {
    const { name, email, password }: any = ctx.request.body

    if (name === '' || email === '' || password === '')
        throw new Error('Bad request')

    if (!validateEmail(email)) throw new Error('email validation failed ')

    try {
        const encryptPassword = await hashPassword(password)
        const userRes = await insertUser({
            name,
            email,
            password: encryptPassword,
        })
        ctx.body = userRes
    } catch (error) {
        ctx.body = error
    }
}

export const getUserById = async (ctx: Context) => {
    const userId: string = ctx.params.id
    try {
        const user = await searchUserById(userId)
        ctx.body = user
    } catch (error) {
        ctx.body = error
    }
}
