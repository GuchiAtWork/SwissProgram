const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int
    user: String
    pass: String
  }

  type Query {
    login: String
  }

  # type Mutation {
  #   signup: String
  # }
`;

module.exports = typeDefs;
