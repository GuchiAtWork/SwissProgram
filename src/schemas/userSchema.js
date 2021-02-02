const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int
    user: String
    pass: String
  }

  type Query {
    "Login to the server - Returns back JWT if successful login"
    login("username" user: String!, "password" pw: String!): String
  }

  type Mutation {
    "Make an account in the server - Returns back message if successful"
    signup("username" user: String!, "password" pw: String!): String

    "Change the logged in user's password - REQUIRES AUTH HEADER (JWT) - Returns back message if successful"
    changePW("new password" pw: String!): String

    "Delete the current user from the server - REQUIRES AUTH HEADER (JWT) - Returns back message if successful"
    deleteUser("given password to make sure" pw: String!): String
  }
`;

module.exports = typeDefs;
