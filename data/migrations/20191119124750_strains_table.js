exports.up = function(knex) {
  return knex.schema.createTable('strains', strains => {
    strains.increments();
    strains.string('strain', 128).notNullable();
    strains
      .integer('strain_id')
      .notNullable()
      .unique();
    strains.string('type', 128).notNullable();
    strains.string('effects', 500);
    strains.string('flavors', 500);
    strains.float('rating', 8, 2);
    strains.string('description', 1000);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('strains');
};
