
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({first_name: 'Patrick', last_name: 'jlksjfda', email: 'Patrick@patrick',password: '12345', username: '@PG'}),
        knex('users').insert({first_name: 'Nick', last_name: 'Desdssa', email: 'NICK@NICK',password: '1234sss5', username: '@1345'}),
        knex('users').insert({first_name: 'Robert', last_name: 'jlksjsasfda', email: 'safdsadsa@dkmwkqk',password: '0987654', username: '@fkjew'})
      ]);
    });
};
