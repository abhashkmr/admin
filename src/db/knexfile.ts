/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config();

module.exports = {

    development: {
      client: process.env.client,
      connection: {
        host: process.env.host, 
        user:  process.env.user,
        password: process.env.password,
        database: process.env.database,
        port: process.env.port,
      },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: process.env.tableName
    }
  }

};
