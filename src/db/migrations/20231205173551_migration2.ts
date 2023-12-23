import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('userupdates', (table) => {
    table.increments('id').primary();
    table.string('content').notNullable();
    table.timestamp('timestamp');
    table.string('user_id').unique().notNullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('updates');
};
