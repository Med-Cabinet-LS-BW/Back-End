const axios = require('axios');
const Strains = require('./strains.model.js');
const url = `https://medizen-ds.herokuapp.com/strains`;

module.exports = {
  normalizeStrains,
  getStrains,
  getAndInsertStrains,
};

function normalizeStrains(strains) {
  return strains.map(strain => ({
    ...strain,
    effects: strain.effects.split(','),
    flavors: strain.flavors.split(','),
  }));
}

async function getStrains() {
  try {
    return await (await axios.get(url)).data.map(
      ({ index, Strain, Type, Rating, Effects, Flavor, Description }) => {
        return {
          strain_id: index,
          strain: Strain,
          type: Type,
          rating: Rating,
          description: Description,
          flavors: Flavor,
          effects: Effects,
        };
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function getAndInsertStrains() {
  try {
    await (await axios.get(url)).data.forEach(
      ({ index, Strain, Type, Rating, Effects, Flavor, Description }) => {
        Strains.insert({
          strain_id: index,
          strain: Strain,
          type: Type,
          rating: Rating,
          description: Description,
          flavors: Flavor,
          effects: Effects,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}
