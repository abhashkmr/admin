// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   }
  // },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // development: {
  //   client: 'postgresql',
    // connection: {
    //   host : 'localhost',
    //   port : 3306,
    //   user : 'root',
    //   password : 'sanjeev8084',
    //   database : 'dailyupdates'
    // },
    development: {
      client: 'postgresql',
      connection: {
        host: 'localhost', // or use the IP address of your Docker host
        user: 'postgres',
        password: 'sanjeev8084',
        database: 'postgres',
        port: 5432,
      },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migration'
    }
  }

};
