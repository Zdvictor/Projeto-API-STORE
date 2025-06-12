// create_cart_table.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('cart', (table) => {
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
      table.integer('qtd').notNullable().defaultTo(1);
      table.string('size', 10).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('cart');
  };
  