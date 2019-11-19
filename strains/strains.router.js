const router = require('express').Router();

const Strains = require('./strains.model.js');
const { normalizeStrains } = require('./strains.helpers.js');

router.get('/', async (req, res) => {
  const limit = req.query.limit || 20;
  const offset = req.query.offset || 0;
  try {
    let strains = await Strains.find(limit, offset);
    res.status(200).json(normalizeStrains(strains));
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving strains from the database. Please try again.`, error });
  }
});

router.get('/:strain_id', async (req, res) => {
  const strain_id = req.params.strain_id;
  try {
    const strain = await Strains.findById(strain_id).first();
    if (strain) {
      res.status(200).json(strain);
    } else {
      res.status(404).json({ message: `Strain with strain_id ${strain_id} not found.` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving strains from the database. Please try again.`, error });
  }
});

module.exports = router;
