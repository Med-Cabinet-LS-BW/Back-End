const axios = require('axios')
const url = `https://medizen-ds.herokuapp.com/strains`

/**
 * 
  const effects = new Set()
  const flavors = new Set()
  effects.add(...Effects.split(','))
  flavors.add(...flavors.split(','))

 */

getStrains()

async function getStrains() {
  try {
    const strainData =
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
