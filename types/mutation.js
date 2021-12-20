import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
} from "graphql";
import { PostType } from "./post.js";
import { InputPostType } from "./inputPost.js";
import { addPost, updatePost, deletePost } from "../resolvers/resolvers.js";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: new GraphQLNonNull(PostType),
      args: {
        input: {
          type: new GraphQLNonNull(InputPostType),
        },
      },
      resolve: async (parent, args, {pubsub}) => {
        const { title, content } = args.input;
        
        return addPost(title, content, pubsub);
      },
    },
    updatePost: {
      type: PostType,
      args: {
        input: {
          type: new GraphQLNonNull(InputPostType),
        },
      },
      resolve: async (parent, args, {pubsub}) => {
        const { id, title, content } = args.input;
        // console.log(id, title, content);

        return updatePost(id, title, content, pubsub);
      },
    },
    deletePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (parent, args, {pubsub}) => {
        const { id } = args;
        
        return deletePost(id, pubsub);
      },
    },
  },
});

export default Mutation;
