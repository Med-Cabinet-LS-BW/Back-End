const db = require('../data/dbConfig.js');

module.exports = {
  findStrainIdsByUserId,
  findByUserId,
  findByStrainIdAndUserId,
  add,
  remove,
};

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

async function remove(id, user_id) {
  try {
    const strain_id = await db('user_favorites')
      .where({ id })
      .select('strain_id')
      .first();
    await db('user_favorites')
      .where({ id, user_id })
      .del();
    return db('strains')
      .where(strain_id)
      .select('*')
      .first();
  } catch (error) {
    return error;
  }
}
