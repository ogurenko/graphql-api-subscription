import { GraphQLSchema, execute, subscribe } from "graphql";
import { WebSocketServer } from "ws";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { PubSub } from "graphql-subscriptions";
import Query from "./types/query.js";
import Mutation from "./types/mutation.js";
import Subscription from "./types/subscription.js";
import expressPlayground from "graphql-playground-middleware-express";
import { SubscriptionServer } from "subscriptions-transport-ws";

const app = express();
const pubsub = new PubSub();
const graphQLPlayground = expressPlayground.default;

// define the schema, with our Query,Mutation and Subscription
const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
  subscription: Subscription,
});


app.use("/graphql", graphqlHTTP({ schema, context: { pubsub } }));

app.use(
  "/playground",
  graphQLPlayground({ endpoint: "/graphql", subscriptionEndpoint: "/graphql" })
);

const server = app.listen(4000, () => {
  const wss = new WebSocketServer({ server, path: "/graphql" });

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: () => {
      return  {
          pubsub
        }
      },
    },
    wss
  );

  console.log("Server running on port 4000");
});
