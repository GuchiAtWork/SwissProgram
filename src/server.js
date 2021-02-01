const express = require("express");
const { ApolloServer } = require("apollo-server-express");
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
});

const port = process.env.PORT || 8080;

app.use(express.json());
server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Port ${port} has opened up!`);
});
