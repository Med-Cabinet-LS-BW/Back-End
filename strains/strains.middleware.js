const Strains = require('./strains.model.js')

module.exports = {
  validateStrainId
}

async function validateStrainId(req, res, next) {
  const { strain_id } = req.body
  try {
    const strain = await Strains.findById(strain_id)
    if (strain) {
      next()
    } else {
      res.status(404).json({ message: `Strain with strain_id: ${strain_id} does not exist` })
    }
  } catch (error) {
    res.status(500).json({ message: `Error validating strain_id. Could not retrieve strain with strain_id: ${strain_id} from the database.` })
  }

}