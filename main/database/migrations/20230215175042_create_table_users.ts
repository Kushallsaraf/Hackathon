import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('drugs', table => {
    table.uuid('id').primary();
    table.string('barcode').unique();
    table.string('drug');
    table.string('quantity');

    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at').notNullable();
    table.boolean('is_deleted').notNullable().defaultTo(false);
    table.dateTime('deleted_at').nullable();

    // TODO(ikeviny): Column for Cognito ID
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('drugs');
}
