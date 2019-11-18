
exports.up = function (knex) {
  return knex.schema.createTable('treatments', treatments => {
    treatments.increments();

    treatments.integer('user_id').unsigned().notNullable();

    treatments.string('strain', 128).notNullable();
    treatments.string('method', 255).notNullable();
    treatments.string('dosage', 255).notNullable();
    treatments.string('schedule', 255).notNullable();
    treatments.string('symptoms', 500).notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('treatments')
};