const router = require('express').Router();

const Favorites = require('./favorites.model.js');

const { normalizeStrains } = require('../strains/strains.helpers.js');
const { validateStrainId } = require('../strains/strains.middleware.js');

router.get('/strains', async (req, res) => {
  const { id } = req.docodedToken;
  try {
    let favorites = await Favorites.findByUserId(id);
    if (favorites.length > 0) {
      favorites = normalizeStrains(favorites);
    }
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: `error retrieving favorites from the db`, error });
  }
});

router.post('/strains', validateStrainId, async (req, res) => {
  const { strain_id } = req.body;
  const user_id = req.docodedToken.id;
  try {
    const addedFavorite = await Favorites.add({ strain_id, user_id });
    res.status(201).json(addedFavorite);
  } catch (error) {
    res.status(500).json({ message: `Error saving favorite to database`, error });
  }
});

router.delete('/strains/:favorite_id', async (req, res) => {
  const { favorite_id } = req.params;
  const user_id = req.docodedToken.id;
  try {
    const removedFavorite = await Favorites.remove(favorite_id, user_id);
    res.status(200).json(normalizeStrains([removedFavorite]));
  } catch (error) {
    res.status(500).json({ message: `Error removing favorite from database`, error });
  }
});

module.exports = router;
