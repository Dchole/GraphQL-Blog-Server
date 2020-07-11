import { SubscriptionResolvers } from "../../types";

const Subscription: SubscriptionResolvers = {
  newPost: {
    subscribe: (_parent, _args, { pubsub }) => pubsub.asyncIterator("NEW_POST")
  },
  newVote: {
    subscribe: (_parent, _args, { pubsub }) => pubsub.asyncIterator("NEW_VOTE")
  }
};

export default Subscription;
