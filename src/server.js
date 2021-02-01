const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const userTypeDefs = require("./schemas/userSchema");
const userResolvers = require("./resolvers/userResolver");

const app = express();
const server = new ApolloServer({
  userTypeDefs,
  userResolvers,
});

const port = process.env.PORT || 8080;

app.use(express.json());
server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Port ${port} has opened up!`);
});
