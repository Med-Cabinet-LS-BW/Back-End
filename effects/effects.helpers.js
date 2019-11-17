const axios = require('axios')
const url = `https://medizen-ds.herokuapp.com/strains`

/**
 * look up and save all effects to effects table
 * look up and save all flavors to flavors table
 * look strains and
 *  for each strain effect, look up the effect in the effects table .where() and create the relationship
 *  for each strain flavor, look up the flavor in the flavors table .where() and create the relationship
 *  save each strain to the strains table
 */

getStrains()

async function getEffects() {
  try {
    const effects =
      await (await axios.get(url))
        .data
        .map(({ index, Strain, Type, Rating, Effects, Flavor, Description }) => {
          return {
            strain_id: index,
            strain: Strain,
            type: Type,
            rating: Rating,
            description: Description
          }
        })
    console.log(strainData)
    return strainData
  } catch (error) {
    console.log(error)
  }
}
