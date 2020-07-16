import { SubscriptionResolvers } from "../../types";
import { withFilter } from "graphql-yoga";

const Subscription: SubscriptionResolvers = {
  newVote: {
    subscribe: withFilter(
      (_parent, _args, { pubsub }) => pubsub.asyncIterator("NEW_VOTE"),
      (payload, variables) => String(payload.newVote.postId) === variables.id
    )
  },
  newComment: {
    subscribe: (_parent, { id }, { pubsub }) =>
      pubsub.asyncIterator("NEW_COMMENT")
  }
};

export default Subscription;
