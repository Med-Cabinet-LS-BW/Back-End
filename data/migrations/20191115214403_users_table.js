
exports.up = function (knex) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users.string('email', 128).notNullable().unique();
    users.string('password', 255).notNullable()

    users.string('firstname', 255)
    users.string('lastname', 255)

    users.string('role', 128)
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists('users');
};
