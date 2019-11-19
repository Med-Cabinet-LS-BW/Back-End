exports.up = function(knex) {
  return knex.schema.createTable('strains', strains => {
    strains.increments();
    strains
      .string('strain', 128)
      .notNullable()
      .unique();
    strains.string('type', 128).notNullable();
    strains.float('rating', 8, 2);
    strains.string('description', 500);
  });
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('strains');
};
