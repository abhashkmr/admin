// knexfile.ts
import 'dotenv/config'

import { Knex } from 'knex'

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            ssl:true
        },
        migrations: {
            directory: './migrations',
            extension: 'ts',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './migrations',
            extension: 'ts',
        },
    },
}

export default config
