const router = require('express').Router();

const Favorites = require('./favorites.model.js');

const { normalizeStrains } = require('../strains/strains.helpers.js');
const { validateStrainId } = require('../strains/strains.middleware.js');

router.get('/strains', async (req, res) => {
  const { id } = req.docodedToken;
  try {
    const favorites = normalizeStrains(await Favorites.findByUserId(id));
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

module.exports = router;
