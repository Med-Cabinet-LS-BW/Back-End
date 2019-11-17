
exports.up = function (knex) {
  return knex.schema.createTable('user_favorites', favorites => {
    favorites.increments();

    // foreign key to project id
    favorites
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');

    // foreign key to resource id
    favorites
      .integer('strain_id')
      .unsigned()
      .references('strain_id')
      .inTable('strains')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users_favorites')
};
