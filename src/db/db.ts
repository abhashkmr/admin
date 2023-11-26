import {Pool} from 'pg'
import 'dotenv/config'


const pool = new Pool({
    max:10,
    host: process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
    ssl: true
})

pool.connect((err: any,client: any,release: any)=>{

    if(err){
        console.error('err connecting to db',err)
        return
    }
    console.log('connected to DB')
    release()
})

export default pool

