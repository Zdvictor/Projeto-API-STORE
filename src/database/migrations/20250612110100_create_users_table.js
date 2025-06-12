// create_users_table.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id');
      table.string('name', 100).notNullable();
      table.string('cpf', 50).notNullable();
      table.string('email', 100).notNullable().unique();
      table.string('password', 100).notNullable();
      table
        .integer('endereco_id')
        .unsigned()
        .references('id')
        .inTable('endereco')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('image', 250);
      table.boolean('admin').notNullable().defaultTo(false);
      table.boolean('isGoogle').notNullable().defaultTo(false);
      table.boolean('hasValidated').notNullable().defaultTo(false);
      table.date('birthat').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  