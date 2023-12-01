import mysql from 'mysql2';

const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile.development);

const pool = mysql.createPool({
  connectionLimit: 10, // Maximum number of connections in the pool
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'sanjeev8084',
  database: 'dailyupdates',
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
  connection.release(); // Release the connection
});

module.exports = db;
export default pool;
