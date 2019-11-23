const Favorites = require('../favorites/favorites.model.js');

module.exports = {
  findFavoriteStrainIds,
  validateFavoriteId,
};

async function findFavoriteStrainIds(req, res, next) {
  const user_id = req.decodedToken.id;
  try {
    req.favorites = new Set(await Favorites.findStrainIdsByUserId(user_id));
    next();
  } catch (error) {
    res.status(500).json({ message: `Error retrieving favorites for user_id:${user_id}`, error });
  }
}

async function validateFavoriteId(req, res, next) {
  const { favorite_id } = req.params;
  try {
    const favorite = await Favorites.findBy({ id: favorite_id });
    if (favorite) {
      next();
    } else {
      res.status(404).json({ message: `Favorite with id ${favorite_id} not found` });
    }
  } catch (error) {
    res.status(500).json({ message: `error validating favorite id`, error: error.message });
  }
}
