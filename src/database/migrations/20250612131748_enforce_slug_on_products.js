exports.up = async function(knex) {
    await knex.schema.alterTable('products', (table) => {
      table.string('slug', 100).notNullable().alter();
    });
    await knex.raw('ALTER TABLE products ADD UNIQUE INDEX products_slug_unique (slug);');
  };
  
  exports.down = async function(knex) {
    // remover índice e tornar coluna nullable de volta
    await knex.raw('ALTER TABLE products DROP INDEX products_slug_unique;');
    await knex.schema.alterTable('products', (table) => {
      table.string('slug', 100).nullable().alter();
    });
  };
  