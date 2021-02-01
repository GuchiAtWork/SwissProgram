exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "GuchiAtWork", password: "guchi" },
        { id: 2, username: "GuchiAtHome", password: "home" },
        { id: 3, username: "GuchiAtRest", password: "rest" },
      ]);
    });
};
