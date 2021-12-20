import { GraphQLObjectType, GraphQLID, GraphQLList } from "graphql";
import { PostType } from "./post.js";
import { getPosts, getPost } from "../resolvers/resolvers.js";

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => getPost(args.id),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => getPosts(),
    },
  },
});

export default Query;
