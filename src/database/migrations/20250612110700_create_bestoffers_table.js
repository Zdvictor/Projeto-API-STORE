// create_bestoffers_table.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('bestoffers', (table) => {
    table.increments('id');
    table
      .integer('id_product')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('bestoffers');
};
