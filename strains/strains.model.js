const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  findByIds,
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

function findByIds(strain_ids) {
  return db('strains')
    .whereIn('strain_id', strain_ids)
    .select(
      'strain',
      'strain_id',
      'type',
      'effects',
      'flavors',
      'rating',
      'description'
    )
}

function add(strain) {
  return db('strains').insert(strain, 'strain_id');
}
