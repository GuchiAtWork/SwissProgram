const knex = require("../db/knex");
const {
  AuthenticationError,
  ApolloError,
  UserInputError,
} = require("apollo-server");
const jwt = require("jsonwebtoken");

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
          return jwt.sign(
            {
              username: find.username,
              user_id: find.id,
            },
            process.env.JWT_SECRET_KEY,
            {
              algorithm: "HS256",
              expiresIn: "1h",
            }
          );
        } else {
          throw new UserInputError("Credentials entered are wrong");
        }
      } else {
        throw new UserInputError("Credentials entered are wrong");
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
        throw new ApolloError("Please choose a unique username");
      } else {
        const res = await knex("users").insert({
          username: name,
          password: pw,
        });
        return "User Successfully Created";
      }
    },

    changePW: async (parent, args, context) => {
      if (context.user === null) {
        throw new AuthenticationError("Need JWT");
      }

      const name = context.user.username;
      const pw = args.pw;
      const updated = await knex("users")
        .where({ username: name })
        .update({ password: pw });
      if (updated) {
        return "Successfully Updated";
      } else {
        throw new ApolloError(
          "Either incorrect credentials or something went wrong"
        );
      }
    },

    deleteUser: async (parent, args, context) => {
      if (context.user === null) {
        throw new AuthenticationError("Need JWT");
      }

      const name = context.user.username;
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
          throw new UserInputError("Incorrect credentials - request denied");
        }
      } else {
        throw new ApolloError("No such user exists");
      }
    },
  },
};
