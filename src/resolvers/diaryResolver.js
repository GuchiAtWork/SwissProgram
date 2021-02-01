const knex = require("../db/knex");

module.exports = {
  Query: {
    getAllDiaries: async (parent, args) => {
      const entries = await knex
        .from("diary")
        .select("entry", "username")
        .where("private", false)
        .join("users", { "users.id": "diary.user_id" });
      return entries;
    },
    getDiariesByID: async (parent, args) => {
      const user_id = args.user_id;
      const entries = await knex
        .from("diary")
        .select("entry", "username")
        .where("user_id", user_id)
        .join("users", { "users.id": "diary.user_id" });
      return entries;
    },
  },
  //   Mutation: {},
};
