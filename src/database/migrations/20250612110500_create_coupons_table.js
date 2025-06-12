/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('coupons', (table) => {
      table.increments('id'); // Chave primária
      table.string('name', 50).notNullable(); // Nome do cupom
      table.decimal('discount', 10, 2).notNullable(); // Valor de desconto
      table.boolean('is_free_shipping').notNullable().defaultTo(false); // Frete grátis?
      table.dateTime('expires_at').notNullable(); // Data de expiração
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp de criação
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('coupons');
  };
  