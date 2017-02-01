exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('userid',50);
    table.string('first_name',50);
    table.string('username',50);
    table.string('last_name',50);
    table.string('email',50);
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
