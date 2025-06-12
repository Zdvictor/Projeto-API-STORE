// create_image_table.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('image', (table) => {
      table.increments('id');
      table
        .integer('id_user')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('path', 250).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('image');
  };
  