const knex = require("../db/knex");
const {
  AuthenticationError,
  ApolloError,
  UserInputError,
} = require("apollo-server");

module.exports = {
  Query: {
    getAllDiaries: async (parent, args) => {
      const entries = await knex
        .from("diary")
        .select("id", "entry", "username")
        .where("private", false)
        .join("users", { "users.id": "diary.user_id" });
      return entries;
    },
    getDiariesByID: async (parent, args) => {
      const user_id = args.user_id;
      const entries = await knex
        .from("diary")
        .select("id", "entry", "username")
        .where("user_id", user_id)
        .join("users", { "users.id": "diary.user_id" });
      return entries;
    },
  },
  Mutation: {
    editDiary: async (parent, args) => {
      const entryID = args.id;
      const entry = args.entry;
      let makePrivate = args.private ? args.private : undefined;

      let updated;

      if (typeof makePrivate !== "undefined") {
        updated = await knex("diary")
          .where({ id: entryID })
          .update({ entry: entry, private: makePrivate });
      } else {
        updated = await knex("diary")
          .where({ id: entryID })
          .update({ entry: entry });
      }

      if (updated) {
        return "Successfully Updated";
      } else {
        throw new ApolloError(
          "Either incorrect credentials or something went wrong"
        );
      }
    },
    createDiary: async (parent, args) => {
      const userID = args.user_id;
      const entry = args.entry;
      const private = args.private;

      await knex("diary").insert({
        user_id: userID,
        entry: entry,
        private: private,
      });
      return "Successfully Created";
    },
    deleteDiary: async (parent, args) => {
      const entryID = args.id;

      await knex("diary").where({ id: entryID }).del();
      return "Entry Successfully Deleted";
    },
  },
};
