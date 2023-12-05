/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('userdetails', function(table) {
        table.increments('id').primary();
        table.string('name');
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('user_id').unique().notNullable();
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
