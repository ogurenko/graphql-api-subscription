import { posts } from "../data/posts.js";

// Resolvers define the technique to get the output data for a field.

// Queries
export const getPosts = () => {
  return posts;
};

export const getPost = (id) => {
  if (id < posts.length) {
    return posts[id - 1];
  }
};

// Mutations
export const addPost = async (title, content, pubsub) => {
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);

  await pubsub.publish("NEW_POST", {
    post_added: newPost,
  });
  return newPost;
};

export const updatePost = async (id, title, content, pubsub) => {
  const post = posts.find((post) => post.id === parseInt(id));
  console.log(post);
  
  if (post) {
    post.title = title;
    post.content = content;
  }

  await pubsub.publish("UPDATED_POST", {
    post_updated: post,
  });
  return post;
};

export const deletePost = async (id, pubsub) => {
  const post = posts.find((post) => post.id === parseInt(id));
  if (!post) {
    throw new Error("Post not found");
  }
  posts.splice(posts.indexOf(post), 1);

  await pubsub.publish("DELETED_POST", {
    post_deleted: post,
  });
  return post;
};
