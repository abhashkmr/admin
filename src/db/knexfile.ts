// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

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
