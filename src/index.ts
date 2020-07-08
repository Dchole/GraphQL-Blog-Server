import { GraphQLServer } from "graphql-yoga";
import { config } from "dotenv";
import { connect } from "mongoose";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";

config();

connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("🔗 Connected to DB!"))
  .catch((err: Error) => console.log("❌ Error:", err));

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation
  },
  context: request => request
});

server.start(() => console.log("🚀 Server running on http://localhost:4000"));
