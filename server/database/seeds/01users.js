const bcrypt = require('bcryptjs');
const saltRounds = 12;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'bananaman',
          name: 'Banana Man',
          email: 'banana@man.com',
          address: '8008 Banana Avenue',
          password: bcrypt.hashSync('1', saltRounds),
        },
        {
          username: 'codemonkey',
          name: 'Code Monkey',
          email: 'code@monkey.com',
          address: '8008 Monkey Place',
          password: bcrypt.hashSync('2', saltRounds),
        },
        {
          username: 'trash panda',
          name: 'Trash Panda',
          email: 'trash@panda.com',
          address: '8008 Panda Street',
          password: bcrypt.hashSync('3', saltRounds),
        },
      ]);
    });
};
