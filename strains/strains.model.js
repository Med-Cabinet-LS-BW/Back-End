const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
};

function find(limit, offset) {
  return db('strains')
    .limit(limit)
    .offset(offset);
}

function findById(strain_id) {
  return db('strains').where('strain_id', '=', strain_id);
}
