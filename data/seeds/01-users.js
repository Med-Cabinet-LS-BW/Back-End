const bcrypt = require('bcryptjs');
const users = [
  {
    id: 1,
    email: 'mando@lambda.com',
    password: bcrypt.hashSync('password', 8),
    birth_date: '1990-01-01',
  },
  {
    id: 2,
    email: 'kuiil@lambda.com',
    password: bcrypt.hashSync('password', 8),
    birth_date: '1987-05-01',
  },
  {
    id: 3,
    email: 'greef@lambda.com',
    password: bcrypt.hashSync('password', 8),
    birth_date: '1975-09-30',
  },
  {
    id: 4,
    email: 'mythrol@lambda.com',
    password: bcrypt.hashSync('password', 8),
    birth_date: '1993-03-15',
  },
];
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('users').insert(users);
};
