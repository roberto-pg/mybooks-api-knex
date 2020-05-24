
exports.up = function (knex) {
    return knex.schema.createTable('books', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('author').notNullable();
        table.string('nationality').notNullable();
        table.string('imageurl').notNullable();
        table.integer('year').notNullable();
        table.boolean('read').notNullable();
    }).then(result => { });
};

exports.down = function (knex) {
    return knex.schema.dropTable('books');
};