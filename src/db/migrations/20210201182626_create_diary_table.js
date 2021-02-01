exports.up = function (knex) {
  return knex.schema.createTable("diary", (table) => {
    table.increments("id").primary();
    table.string("entry").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("private").defaultTo(true);
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("cascade");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("diary");
};
