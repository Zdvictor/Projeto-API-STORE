/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
      table.increments('id'); // Chave primária
      table.string('name', 45).notNullable();
      table.text('description').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.string('image', 255).notNullable();
      table.string('size', 10).notNullable();
      table.integer('stock').notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('products');
  };
  