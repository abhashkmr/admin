import { v4 as uuidv4 } from 'uuid'

import pool from '../db/db'

export type User = {
    name: string
    email: string
    password: string
    role?: string
}

export async function getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users'
        pool.query(query, (err, users) => {
            if (err) {
                reject(err)
            } else {
                resolve(users.rows)
            }
        })
    })
}

export async function insertUser(userData: User) {
    return new Promise((resolve, reject) => {
        const user_id = uuidv4()
        const query =
            'INSERT INTO users (user_id,name,email,password) VALUES($1,$2,$3,$4)'
        const values = [
            user_id,
            userData.name,
            userData.email,
            userData.password,
        ]
        pool.query(query, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
    })
}

export async function searchUserByMail(email: string): Promise<User> {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = $1'
        const values = [email]

        pool.query(query, values, (err, result) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            if (result.rows.length > 0) {
                resolve(result.rows[0])
            } else {
                // Resolve with null if no user found
                return reject('user not found')
            }
        })
    })
}

export async function searchUserById(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE user_id = $1'
        const values = [userId]

        pool.query(query, values, (err, result) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            if (result.rows.length > 0) {
                resolve(result.rows[0])
            } else {
                return reject('user not found')
            }
        })
    })
}
