// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    development: {
      client: 'postgresql',
      connection: {
        host: process.env.host, 
        user:  process.env.uses,
        password: process.env.password,
        database: process.env.database,
        port: process.env.port,
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
