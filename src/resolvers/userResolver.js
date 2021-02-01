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
      if (find) {
        if (find.password === pw) {
          return "Login successful";
        } else {
          return "Credentials entered are wrong";
        }
      } else {
        return "Credentials entered are wrong";
      }
    },
  },
  Mutation: {
    signup: async (parent, args) => {
      const name = args.user;
      const pw = args.pw;
      const find = await knex
        .from("users")
        .select("*")
        .where("username", name)
        .first();
      if (find) {
        return "Please choose a unique username";
      } else {
        const res = await knex("users").insert({
          username: name,
          password: pw,
        });
        return "User Successfully Created";
      }
    },

    changePW: async (parent, args) => {
      const name = args.user;
      const pw = args.pw;
      const updated = await knex("users")
        .where({ username: name })
        .update({ password: pw });
      if (updated) {
        return "Successfully Updated";
      } else {
        return "Either incorrect credentials or something went wrong";
      }
    },

    deleteUser: async (parent, args) => {
      const name = args.user;
      const pw = args.pw;
      const find = await knex
        .from("users")
        .select("*")
        .where("username", name)
        .first();
      if (find) {
        if (pw === find.password) {
          await knex("users").where({ username: name }).del();
          return "User Deleted";
        } else {
          return "Incorrect credentials - request denied";
        }
      } else {
        return "No such user exists";
      }
    },
  },
};
