// create_orders_table.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', (table) => {
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
      table.boolean('isPaid').notNullable().defaultTo(false);
      table.string('link', 250);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.text('qr_code');
      table.text('qr_code_base_64');
      table.integer('qtd').notNullable().defaultTo(1);
      table.string('size', 10).notNullable();
      table.decimal('total_price', 10, 2).notNullable();
      table.string('url_payment', 255);
      table.string('cellphone', 20);
      table.bigInteger('id_order');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('orders');
  };
  