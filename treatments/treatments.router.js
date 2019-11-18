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

router.post('/', async (req, res) => {
  const treatment = req.body;
  const { id } = req.docodedToken;
  treatment.user_id = id;
  try {
    const addedTreatment = await Treatments.add(treatment);
    res.status(201).json(addedTreatment);
  } catch (error) {
    res.status(500).json({ message: `error creating treatment for user ${id}` })
  }
});

module.exports = router;
