# admin

# Local Setup 
 install docker desktop on your machine and pull mysql image
  
```bash
docker pull mysql

docker run -d --name mysql-container -e MYSQL_ROOT_PASSWORD=yourpassword -p 3306:3306 mysql:latest

docker exec -it mysql-container mysql -u root -p

```

create database & tables in mysql.

- users table
```bash
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int          | NO   | PRI | NULL    | auto_increment |
| name     | varchar(255) | YES  |     | NULL    |                |
| email    | varchar(255) | NO   |     | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |
| user_id  | varchar(255) | NO   | UNI | NULL    |                |
+----------+--------------+------+-----+---------+----------------+

```

- updates table

```bash
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int          | NO   | PRI | NULL    | auto_increment |
| content   | varchar(255) | NO   |     |         |                |
| timestamp | timestamp    | YES  |     | NULL    |                |
| user_id   | varchar(255) | NO   | UNI | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+

```

sample creation command

```bash
 CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      user_id VARCHAR(255) NOT NULL UNIQUE;
     );

 CREATE TABLE updates (
       id SERIAL PRIMARY KEY,
       user_id VARCHAR(255) NOT NULL ,
       content TEXT NOT NULL,
       timestamp TIMESTAMP NOT NULL,
       FOREIGN KEY (user_id) REFERENCES users(user_id);
      );
```


