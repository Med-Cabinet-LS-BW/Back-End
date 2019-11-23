const db = require('../data/dbConfig.js');

module.exports = {
  findStrainIdsByUserId,
  findByUserId,
  findByStrainIdAndUserId,
  findBy,
  add,
  remove,
};

async function findBy(params) {
  return db('user_favorites')
    .where(params)
    .first();
}

async function findByStrainIdAndUserId(strain_id, user_id) {
  return db('user_favorites')
    .where({ strain_id, user_id })
    .first();
}

function findByUserId(id) {
  return db('user_favorites')
    .join('strains as s', 's.strain_id', '=', 'user_favorites.strain_id')
    .where('user_favorites.user_id', '=', id)
    .select(
      'user_favorites.id as favorite_id',
      's.strain_id',
      's.strain',
      's.type',
      's.effects',
      's.flavors',
      's.rating',
      's.description'
    );
}

function findStrainIdsByUserId(user_id) {
  return db
    .table('user_favorites')
    .where({ user_id })
    .pluck('strain_id');
}

function add(favorite) {
  return db('user_favorites').insert(favorite, 'id');
}

async function remove(id) {
  try {
    const favorite = await db('user_favorites')
      .where({ id })
      .first();
    await db('user_favorites')
      .where({ id })
      .del();
    return favorite;
  } catch (error) {
    return error;
  }
}
