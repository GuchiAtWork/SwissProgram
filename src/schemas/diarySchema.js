const { gql } = require("apollo-server");

const typeDefs = gql`
  type Entry {
    username: String
    entry: String
  }

  extend type Query {
    getAllDiaries: [Entry]
    getDiariesByID(user_id: Int): [Entry]
  }

  # type Mutation {

  # }
`;

module.exports = typeDefs;
