const db = require('../data/dbConfig.js');

module.exports = {
  findBy,
  findById,
  create,
};

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .where('id', '=', id)
    .select('id', 'email', 'firstname', 'lastname', 'role')
    .first();
}

async function create(user) {
  const [id] = await db('users').insert(user, 'id', 'email', 'firstname', 'lastname', 'role');
  return findById(id);
}
