const router = require('express').Router();

const Treatments = require('./treatments.model.js')

router.get('/', async (req, res) => {
  const { id } = req.decodedToken;
  try {
    const treatments = await Treatments.findByUserId(id)
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ message: `error retrieving treatments for user ${id}` })
  }
});

router.get('/:treatment_id', async (req, res) => {
  const { treatment_id } = req.params;
  try {
    const treatment = await Treatments.findByTreatmentId(treatment_id)
    res.status(200).json(treatment);
  } catch (error) {
    res.status(500).json({
      message: `error retrieving treatment ${treatment_id}`
    })
  }
});

router.post('/', async (req, res) => {
  const treatment = req.body;
  const { id } = req.decodedToken;
  treatment.user_id = id;
  try {
    const addedTreatment = await Treatments.add(treatment);
    res.status(201).json(addedTreatment);
  } catch (error) {
    res.status(500).json({ message: `error creating treatment for user ${id}` })
  }
});

router.put('/:treatment_id', async (req, res) => {
  const fields = req.body;
  const { treatment_id } = req.params;
  const user_id = req.decodedToken.id;

  // validate fields
  // validate treatment_id
  // validate user has access to provided treatment_id
  // execute put operation

  try {
    const treatment = await Treatments.findByTreatmentId(treatment_id)
    if (user_id !== treatment.user_id) {
      res.status(401).json({ message: `You do not have access to this treatment plan` })
    } else {
      try {
        const updatedTreatment = await Treatments.update(treatment_id, fields);
        res.status(201).json(updatedTreatment);
      } catch (error) {
        res.status(500).json({ message: `error updating treatment for user ${id}` })
      }
    }
  } catch (error) {
    res.status(500).json({ message: `Error looking up treatment with id ${treatment_id} ` })
  }
});

router.delete('/:treatment_id', async (req, res) => {
  const { treatment_id } = req.params;
  const user_id = req.decodedToken.id;

  // validate fields
  // validate treatment_id
  // validate user has access to provided treatment_id
  // execute put operation

  try {
    const treatment = await Treatments.findByTreatmentId(treatment_id)
    if (user_id !== treatment.user_id) {
      res.status(401).json({ message: `You do not have access to this treatment plan` })
    } else {
      try {
        const deletedTreatment = await Treatments.remove(treatment_id);
        res.status(202).json({ message: `Treatment with id ${treatment_id} successfully removed from the database.` });
      } catch (error) {
        res.status(500).json({ message: `error deleting treatment for user ${id}` })
      }
    }
  } catch (error) {
    res.status(500).json({ message: `Error looking up treatment with id ${treatment_id} ` })
  }
})

module.exports = router;
