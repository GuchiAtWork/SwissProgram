const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int
    user: String
    pass: String
  }

  type Query {
    login(user: String, pw: String): String
  }

  type Mutation {
    signup(user: String!, pw: String!): String
    changePW(user: String!, pw: String!): String
    deleteUser(user: String!, pw: String!): String
  }
`;

module.exports = typeDefs;
