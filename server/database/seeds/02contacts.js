exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('contacts').insert([
        {
          name: 'Mr. 17',
          email: '17@seventeen.com',
          address: 'Ohana Market',
          phone: '808-309-3404',
          github: 'bmastumoto',
          created_by: 1,
        },
        {
          name: 'Uncle Kimo',
          email: 'ho@braddah.com',
          address: 'Kaisers Beach Park',
          phone: 'No Phone Brah',
          github: 'whats github cuz',
          created_by: 2,
        },
        {
          name: 'Papa John',
          email: 'pizza@crappy.com',
          address: 'Any Papa Johns',
          phone: '8080-643-1111',
          github: 'papaJohn',
          created_by: 3,
        },
        {
          name: 'Toucan Sam',
          email: 'froot@loops.com',
          address: 'Fruity Avenue',
          phone: '888-123-4522',
          github: 'toucanSam',
          created_by: 1,
        },
        {
          name: 'Captain Crunch',
          email: 'peanut@butter.com',
          address: 'Cereal Lane',
          phone: '888-112-2334',
          github: 'daCaptain',
          created_by: 2,
        },
      ]);
    });
};
