exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users
      .string('email', 128)
      .notNullable()
      .unique();
    users.string('password', 255).notNullable();

    users.string('firstname', 255);
    users.string('lastname', 255);

    users.string('role', 128);

    users.date('birth_date');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
