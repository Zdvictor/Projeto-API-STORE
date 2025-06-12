// create_reviews_table.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('reviews', (table) => {
      table.increments('id');
      table
        .integer('id_user')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('id_product')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('stars').notNullable();
      table.text('commentary');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
  };
  