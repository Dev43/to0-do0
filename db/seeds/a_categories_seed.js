
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('categories').insert({category_name: 'Movies'}),
        knex('categories').insert({category_name: 'Books'}),
        knex('categories').insert({category_name: 'Food'}),
        knex('categories').insert({category_name: 'Products'})
      ]);
    });
};
