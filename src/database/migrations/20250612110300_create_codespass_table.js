/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('codespass', (table) => {
      table.increments('id'); // Chave primária
      table.string('email', 200).notNullable();
      table.string('code', 200).notNullable();
      table.integer('isUsed').notNullable(); // Pode ser 0 ou 1 (booleano manual)
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('codespass');
  };
  