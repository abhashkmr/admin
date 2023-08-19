import pool from "./db";

interface User {
  id: number;
  username: string;
  password:string;
  // ...other properties
}

export async function getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
      pool.query(query, (err:any, users:any) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
    });
}

export async function insertUpdate(userId:Number,content:string){
  return new Promise((resolve,reject)=>{
    const query ='INSERT INTO updates (user_id, content, timestamp) VALUES (?, ?, NOW())';
    const values = [userId, content];
    pool.query(query, values, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results); // Resolve with the inserted ID
    });
  })
}