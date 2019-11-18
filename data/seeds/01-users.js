const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  // Inserts seed entries
  return knex('users').insert([
    { id: 1, email: 'mando@lambda.com', password: bcrypt.hashSync('password', 8), },
    { id: 2, email: 'kuiil@lambda.com', password: bcrypt.hashSync('password', 8), },
    { id: 3, email: 'greef@lambda.com', password: bcrypt.hashSync('password', 8), },
    { id: 4, email: 'mythrol@lambda.com', password: bcrypt.hashSync('password', 8), },
  ]);
};