const { gql } = require("apollo-server");

const typeDefs = gql`
  type Entry {
    id: Int
    username: String
    entry: String
  }

  extend type Query {
    getAllDiaries: [Entry]
    getDiariesByID: [Entry]
  }

  extend type Mutation {
    editDiary(id: Int!, entry: String!, private: Boolean): String
    createDiary(entry: String!, private: Boolean = true): String
    deleteDiary(id: Int!): String
  }
`;

module.exports = typeDefs;
