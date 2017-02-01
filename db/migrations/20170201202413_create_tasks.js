exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments('taskid',50);
    table.string('task_name',50);
    table.integer('user_id',50);
    table.foreign('user_id').references('users.userid');
    table.integer('category_id',50);
    table.foreign('category_id').references('categories.categoryid');
    table.boolean('isComplete',50);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};
