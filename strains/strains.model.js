const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findById,
};

function findAll() {
  return db('strains');
}

function findById(strain_id) {
  return db('strains').where('strain_id', '=', strain_id);
}
