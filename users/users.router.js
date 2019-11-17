const router = require('express').Router();
const { normalizeStrains } = require('../strains/strains.helpers.js')
const Favorites = require('../favorites/favorites.model.js')

router.get('/', (req, res) => {
  res.status(200).json({ message: `users router is up` });
});

router.get('/favorites', async (req, res) => {
  const { id } = req.docodedToken
  try {
    const favorites = normalizeStrains(await Favorites.findByUserId(id));
    res.status(200).json(favorites)

  } catch (error) {
    res.status(500).json({ message: `error retrieving favorites from the db`, error })
  }
})

module.exports = router;
