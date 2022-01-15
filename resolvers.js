const Post = require("./Models/Post.model");
const resolvers = {
  Query: {
    getAllPosts: async () => {
      const posts = await Post.find({});
      return posts;
    },
    getPost: async (_, args, __) => {
      const { id } = args;
      return await Post.findById(id);
    },
  },

  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description } = args.post;
      const post = new Post({
        title,
        description,
      });
      await post.save();
      return post;
    },
    deletePost: async (parent, { id }, context, info) => {
      await Post.findByIdAndDelete(id);
      return "Ok Post Deleted";
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { title, description } = args.post;
      const post = await Post.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
      return post;
    },
  },
};

module.exports = resolvers;
