import pool from '../db/db'

export async function insertUpdate(userId: string, content: string) {
    return new Promise((resolve, reject) => {
        const query =
            'INSERT INTO updates (user_id, content, timestamp) VALUES ($1, $2, NOW())'
        const values = [userId, content]
        pool.query(query, values, (err, results) => {
            if (err) {
                return reject(err)
            }
            resolve(results)
        })
    })
}

export async function findUpdatesByUserId(userId: string) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM updates WHERE user_id = $1'
        const values = [userId]

        pool.query(query, values, (err, result) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            if (result.rows.length > 0) {
                resolve(result.rows)
            } else {
                return reject('no updates found')
            }
        })
    })
}
