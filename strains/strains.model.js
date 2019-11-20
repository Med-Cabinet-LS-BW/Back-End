const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  add,
};

function find(limit, offset) {
  return db('strains')
    .limit(limit)
    .offset(offset);
}

function findById(strain_id) {
  return db('strains').where('strain_id', '=', strain_id);
}

function add(strain) {
  return db('strains').insert(strain, 'strain_id');
}
