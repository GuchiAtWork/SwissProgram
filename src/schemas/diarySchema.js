const { gql } = require("apollo-server");

const typeDefs = gql`
  type Entry {
    id: Int
    username: String
    entry: String
  }

  extend type Query {
    "Get all publicly available diaries - Returns back a list of entries"
    getAllDiaries: [Entry]

    "Get all diaries made by current user - REQUIRES AUTH HEADER (JWT) - Returns back a list of entries"
    getDiariesByID: [Entry]
  }

  extend type Mutation {
    "Edit a specific diary made by current user - REQUIRES AUTH HEADER (JWT) - Returns back a message if successful"
    editDiary(
      "the diary id user wants to edit"
      id: Int!
      "new entry"
      entry: String!
      "make diary public"
      private: Boolean
    ): String

    "Current user makes a new diary - REQUIRES AUTH HEADER (JWT) - Returns back a message if successful"
    createDiary(
      "new entry"
      entry: String!
      "make diary public"
      private: Boolean = true
    ): String

    "Delete a specific diary (this diary made by cur user) - REQUIRES AUTH HEADER (JWT) - Returns back message if successful"
    deleteDiary("specific diary that user wants to delete" id: Int!): String
  }
`;

module.exports = typeDefs;
