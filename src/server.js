const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolver");

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 8080;

app.use(express.json());
server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Port ${port} has opened up!`);
});
