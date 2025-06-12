/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('endereco', (table) => {
      table.increments('id'); // Chave primária
      table.string('numero', 10).notNullable();
      table.string('bairro', 255).notNullable();
      table.string('rua', 255).notNullable();
      table.string('cidade', 255).notNullable();
      table.string('estado', 2).notNullable();
      table.string('cep', 10).notNullable();
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('endereco');
  };
  