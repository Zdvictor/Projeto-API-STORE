/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('codesvalidator', (table) => {
      table.increments('id'); // Chave primária
      table.string('email', 255).notNullable();
      table.string('code', 255).notNullable();
      table.boolean('isUsed').notNullable().defaultTo(false); // tinyint interpretado como boolean
      table.timestamp('created_at').defaultTo(knex.fn.now()); // Data de criação
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('codesvalidator');
  };
  