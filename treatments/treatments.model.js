const db = require('../data/dbConfig.js')

module.exports = {
  findByUserId,
  findByTreatmentId,
  add
}

function findByUserId(user_id) {
  return db('treatments').where({ user_id });
}

function findByTreatmentId(id) {
  return db('treatments').where({ id });
}

async function add(treatment) {
  const [id] = await db('treatments').insert(treatment, 'id');
  return findByTreatmentId(id).first();
}

async function update(id, fields) {
  try {
    const updated = await db('treatments').where({ id }).update(fields, 'id');
    if (updated) {
      return findByTreatmentId(id).first();
    }
  } catch (error) {
    return error
  }
}
