const knex = require("../db/knex");

module.exports = {
  Query: {
    login: async (parent, args) => {
      const name = args.user;
      const pw = args.pw;
      const find = await knex
        .from("users")
        .select("*")
        .where("username", name)
        .first();
      console.log(find);
      if (find) {
        return "Login successful";
      } else {
        return "Credentials entered are wrong";
      }
    },
  },
  Mutation: {},
};
