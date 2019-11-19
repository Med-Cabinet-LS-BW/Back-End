const router = require('express').Router();

const Strains = require('./strains.model.js');

router.get('/', async (req, res) => {
  try {
    const strains = await Strains.findAll();
    res.status(200).json(strains);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving strains from the database. Please try again.`, error });
  }
});

module.exports = router;
