/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // só cria se ainda não existir
    const exists = await knex.schema.hasColumn('products', 'slug');
    if (!exists) {
      await knex.schema.alterTable('products', (table) => {
        table.string('slug', 100).nullable().after('name');
      });
    }
  
    // back-fill
    const products = await knex('products').select('id', 'name');
    for (const { id, name } of products) {
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      await knex('products').where({ id }).update({ slug });
    }
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    // no rollback basta remover a coluna caso exista
    const exists = await knex.schema.hasColumn('products', 'slug');
    if (exists) {
      await knex.schema.alterTable('products', (table) => {
        table.dropColumn('slug');
      });
    }
  };
  