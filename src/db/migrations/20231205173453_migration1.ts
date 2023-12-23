import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
  return knex.schema.createTable('userdetail', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('user_id').unique().notNullable();
  });
};

export const down = async (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('userdetails');
};
