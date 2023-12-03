exports.up = function(knex) {
    return knex.schema.createTable('updates', function(table) {
      table.increments('id').primary();
      table.string('content').notNullable();
      table.timestamp('timestamp');
      table.string('user_id').unique().notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('updates');
  };
  
