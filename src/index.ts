import { GraphQLServer, PubSub } from "graphql-yoga";
import { config } from "dotenv";
import { connect } from "mongoose";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";

config();

connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("🔗 Connected to DB!"))
  .catch((err: Error) => console.log("❌ Error:", err));

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription
  },
  context: ({ request }) => ({ request, pubsub })
});

server.start(() => console.log("🚀 Server running on http://localhost:4000"));
