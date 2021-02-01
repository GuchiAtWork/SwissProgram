const express = require("express");
const { ApolloServer, ApolloError } = require("apollo-server-express");
const { GraphQLError } = require("graphql");
const _merge = require("lodash/merge");

const userTypeDefs = require("./schemas/userSchema");
const diaryTypeDefs = require("./schemas/diarySchema");
const userResolvers = require("./resolvers/userResolver");
const diaryResolvers = require("./resolvers/diaryResolver");

const resolvers = _merge({}, userResolvers, diaryResolvers);

const app = express();
const server = new ApolloServer({
  typeDefs: [userTypeDefs, diaryTypeDefs],
  resolvers,
  formatError: (error) => {
    if (error.originalError instanceof ApolloError) {
      return error;
    }

    return new GraphQLError("Internal Server Error");
  },
});

const port = process.env.PORT || 8080;

app.use(express.json());
server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Port ${port} has opened up!`);
});
