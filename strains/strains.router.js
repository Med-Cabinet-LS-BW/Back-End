const router = require('express').Router();
const axios = require('axios');

const Strains = require('./strains.model.js');

const { getUserFavoritesStrainIds } = require('../favorites/favorites.middleware.js');
const { normalizeStrains, getStrains } = require('./strains.helpers.js');

router.get('/', getUserFavoritesStrainIds, async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const { favorites } = req;
  try {
    console.log('favorites', favorites);
    const strains = await Strains.find(limit, offset).map(async s => {
      return {
        ...s,
        is_favorite: favorites.has(s.strain_id),
      };
    });
    res.status(200).json(normalizeStrains(strains));
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving strains from the database. Please try again.`, error });
  }
});

router.get('/:strain_id', getUserFavoritesStrainIds, async (req, res) => {
  const strain_id = req.params.strain_id;
  const { favorites } = req;
  try {
    const is_favorite = favorites.has(Number(strain_id));
    const strain = await Strains.findById(strain_id).then(s => {
      return {
        ...s,
        is_favorite,
      };
    });
    if (strain) {
      res.status(200).json(normalizeStrains([strain]));
    } else {
      res.status(404).json({ message: `Strain with strain_id ${strain_id} not found.` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving strains from the database. Please try again.`, error });
  }
});

router.post('/', async (req, res) => {
  const strain = req.body;
  try {
    const added = await Strains.add(strain);
    res.status(201).json(added);
  } catch (error) {
    res.status(500).json({
      message: `Error inserting strain into the database. Please try again.`,
      error,
    });
  }
});

router.post('/recommendations', getUserFavoritesStrainIds, async (req, res) => {
  // middleware candidate
  const { filters } = req.body;
  const { id } = req.decodedToken;
  const { favorites } = req;

  let limit = req.body.limit || 10;
  if (!filters) {
    res.status(400).json({ message: `filters are required.` });
  } else if (!filters.length) {
    res.status(400).json({
      message: `Received filters of type ${typeof filters}. Filters must be of type array.`,
    });
  } else {
    try {
      // needs better error handling here
      // lots of requests happening

      const filterString = filters.join('%2C');
      const url = `https://medizen-ds.herokuapp.com/rec/${limit}/${filterString}`;

      const { data: strainIds } = await axios.get(url);
      const strains = await Strains.findByIds(strainIds).map(async s => {
        return {
          ...s,
          is_favorite: favorites.has(s.strain_id),
        };
      });

      res.status(200).json(normalizeStrains(strains));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Could not GET from ds api` });
    }
  }
});

router.post('/fetch-all-strains', async (req, res) => {
  const { username } = req.body;

  if (!username || username !== 'joe') {
    res.status(401).json({ message: `You are not authorized to access this resource` });
  } else {
    try {
      const strains = await getStrains();
      await strains.forEach(async s => await Strains.add(s));
      res.status(200).json({
        message: `Successfully fetched and inserted all strains from the ds api`,
      });
    } catch (error) {
      res.status(500).json({
        message: `Error fetching and inserting strains into the database. Please try again.`,
        error,
      });
    }
  }
});

module.exports = router;
