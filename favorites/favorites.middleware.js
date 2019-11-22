const Favorites = require('../favorites/favorites.model.js');

module.exports = {
  getUserFavoritesStrainIds,
};

async function getUserFavoritesStrainIds(req, res, next) {
  const user_id = req.decodedToken.id;
  try {
    req.favorites = new Set(await Favorites.findStrainIdsByUserId(user_id));
    next();
  } catch (error) {
    res.status(500).json({ message: `Error retrieving favorites for user_id:${user_id}`, error });
  }
}
