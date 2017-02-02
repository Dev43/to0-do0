
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('tasks').insert({task_name: 'Do laundry', user_id: 1, category_id: 1, isComplete: false}),
        knex('tasks').insert({task_name: 'wash car', user_id: 2, category_id: 2, isComplete: false}),
        knex('tasks').insert({task_name: 'have dinner', user_id: 3, category_id: 3, isComplete: false})
      ]);
    });
};
