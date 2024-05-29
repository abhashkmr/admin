import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('updates', (table) => {
        table.increments('id').primary()
        table.text('content').notNullable()
        table
            .uuid('user_id')
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE')
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('updates')
}
