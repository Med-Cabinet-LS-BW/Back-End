const db = require('../data/dbConfig.js');

module.exports = {
  findById,
  add
}

function findById(id) {
  return db('users').where(id, '=', 'id').select('email', 'id')
}

function add(user) {

}