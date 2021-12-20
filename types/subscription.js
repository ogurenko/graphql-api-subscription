import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { PostSubscription } from "./post.js";

const Subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    post_added: {
      type: new GraphQLNonNull(PostSubscription),
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("NEW_POST");
      },
    },
    post_updated: {
      type: new GraphQLNonNull(PostSubscription),
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("UPDATED_POST");
      },
    },
    post_deleted: {
      type: new GraphQLNonNull(PostSubscription),
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterator("DELETED_POST");
      },
    },
  },
});

export default Subscription;
