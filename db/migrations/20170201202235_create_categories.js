exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function (table) {
    table.increments('categoryid',50);
    table.string('category_name',50);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};
