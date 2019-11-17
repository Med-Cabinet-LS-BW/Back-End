const db = require('../data/dbConfig.js');

module.exports = {
  findByUserId
}

function findByUserId(id) {
  return db('user_favorites')
    .join('strains as s', 's.strain_id', '=', 'user_favorites.strain_id')
    .where('user_favorites.user_id', '=', id)
    .select(
      's.strain',
      's.type',
      's.effects',
      's.flavors',
      's.rating',
      's.description'
    )
}