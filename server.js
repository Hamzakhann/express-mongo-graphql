const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

async function startServer() {
  const app = express();
  const apolloserver = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloserver.start();
  apolloserver.applyMiddleware({ app });
  app.use((req, res) => {
    res.send("Hello from SERVER");
  });

  await mongoose
    .connect("mongodb://localhost:27017/post_db", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((con) => console.log("Mongoose connected"))
    .catch(e=>console.log(e))
  app.listen(4000, () => console.log("Server is running on PORT 4000"));
}

startServer();
