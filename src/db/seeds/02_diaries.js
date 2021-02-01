exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("diary")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("diary").insert([
        { id: 1, entry: "Did some coding", user_id: 1 },
        { id: 2, entry: "Went to sleep", private: false, user_id: 2 },
        { id: 3, entry: "Had some dinner", private: false, user_id: 3 },
        { id: 4, entry: "Creating seeds...", user_id: 1 },
      ]);
    });
};
