import 'dotenv/config'

import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: true,
})

pool.connect((err, client, release) => {
    if (err) {
        console.error('err connecting to db', err)
        return
    }
    console.log('connected to DB')
    release()
})

export default pool
