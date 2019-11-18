const router = require('express').Router();

const Treatments = require('./treatments.model.js')

router.get('/', async (req, res) => {
  const { id } = req.docodedToken;
  try {
    const treatments = await Treatments.findByUserId(id)
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ message: `error retrieving treatments for user ${id}` })
  }
});

module.exports = router;
