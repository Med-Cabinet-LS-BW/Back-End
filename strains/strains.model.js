const db = require('../data/dbConfig.js');

module.exports = {
  find,
  findById,
  findByIds,
  add,
  isFavorite,
};

const strainFields = [
  'id',
  'strain',
  'strain_id',
  'type',
  'effects',
  'flavors',
  'rating',
  'description',
];

function find(limit, offset) {
  return db('strains')
    .orderBy('strain_id')
    .limit(limit)
    .offset(offset)
    .select(...strainFields);
}

function findById(strain_id) {
  return db('strains').where('strain_id', '=', strain_id);
}

function findByIds(strain_ids) {
  return db('strains')
    .whereIn('strain_id', strain_ids)
    .select(...strainFields);
}

function add(strain) {
  return db('strains').insert(strain, 'strain_id');
}

async function isFavorite(strain_id, user_id) {
  const favorite = await db('user_favorites').where({ strain_id, user_id });
  return !favorite.length ? false : true;
}
