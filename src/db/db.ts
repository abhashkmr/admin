import mysql from 'mysql2';

const pool = mysql.createPool({
  connectionLimit: 10, // Maximum number of connections in the pool
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345',
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

export default pool;
