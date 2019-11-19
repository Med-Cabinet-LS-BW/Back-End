const { getStrains } = require('../../strains/strains.helpers.js');

exports.seed = async function(knex) {
  let strains;
  try {
    strains = await getStrains();
  } catch (error) {
    console.log(error);
  } finally {
    return knex('strains').insert(strains.slice(0, 199));
  }
};
