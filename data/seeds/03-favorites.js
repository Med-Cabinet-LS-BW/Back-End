const favorites = [
  {
    id: 1,
    user_id: 1,
    strain_id: 10
  },
  {
    id: 2,
    user_id: 1,
    strain_id: 11
  },
  {
    id: 3,
    user_id: 1,
    strain_id: 12
  },
  {
    id: 4,
    user_id: 1,
    strain_id: 13
  },
  {
    id: 5,
    user_id: 1,
    strain_id: 14
  },
  {
    id: 6,
    user_id: 2,
    strain_id: 10
  },
  {
    id: 7,
    user_id: 2,
    strain_id: 11
  },
  {
    id: 8,
    user_id: 2,
    strain_id: 130
  },
  {
    id: 9,
    user_id: 2,
    strain_id: 18
  },
  {
    id: 10,
    user_id: 3,
    strain_id: 14
  },
]

exports.seed = async function (knex) {
  return knex('user_favorites').insert(favorites);
};