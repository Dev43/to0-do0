
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('ALTER TABLE tasks ALTER COLUMN task_name TYPE varchar(255)')
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('ALTER TABLE tasks ALTER COLUMN task_name TYPE varchar(255)')
  ])
};
