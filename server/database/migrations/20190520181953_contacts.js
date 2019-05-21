exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments('id');
    table.string('name', 255).notNull();
    table.string('address', 255).notNull();
    table.string('email', 255).notNull();
    table.string('phone', 255).notNull();
    table.string('github', 255).notNull();
    table
      .integer('created_by')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts');
};
