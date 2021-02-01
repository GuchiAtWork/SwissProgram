const express = require("express");
const { ApolloServer, ApolloError } = require("apollo-server-express");
const { GraphQLError } = require("graphql");
const expressJwt = require("express-jwt");
const _merge = require("lodash/merge");

const userTypeDefs = require("./schemas/userSchema");
const diaryTypeDefs = require("./schemas/diarySchema");
const userResolvers = require("./resolvers/userResolver");
const diaryResolvers = require("./resolvers/diaryResolver");

const resolvers = _merge({}, userResolvers, diaryResolvers);

const app = express();

app.use(express.json());
app.use(
  expressJwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

const server = new ApolloServer({
  typeDefs: [userTypeDefs, diaryTypeDefs],
  resolvers,
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  },
  formatError: (error) => {
    if (error.originalError instanceof ApolloError) {
      return error;
    }
    return error;
    // return new GraphQLError("Internal Server Error");
  },
});

const port = process.env.PORT || 8080;

server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Port ${port} has opened up!`);
});
