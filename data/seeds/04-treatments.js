const treatments = [
  {
    id: 1,
    user_id: 3,
    strain: 'white widow',
    method: 'edible',
    dosage: '3mg',
    schedule: 'twice daily',
    symptoms: 'anxiety'
  },
  {
    id: 2,
    user_id: 3,
    strain: 'Purple Haze',
    method: 'edible',
    dosage: '5mg',
    schedule: 'before bed',
    symptoms: 'insomnia'
  },
]


exports.seed = function (knex) {
  return knex('treatments').insert(treatments);
};
