
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
    }).then(result => { });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};