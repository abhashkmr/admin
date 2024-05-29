import 'dotenv/config'

import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
    ssl:true
})

async function connectToDB() {
    try {
        const client = await pool.connect()
        console.log('connected to DB')
        client.release()
    } catch (err) {
        console.error('Error connecting to DB:', err)
    }
}

connectToDB()

export default pool
