const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const getAllUsers = async () => {
  return await User.find().populate({
    path: "posts",
    populate: {
      path: "comments",
      model: "Comment",
    },
  });
};

const createUser = async (name, email) => {
  const newUser = new User({ name, email });
  return await newUser.save();
};

const getAllPosts = async () => {
  return await Post.find().populate("comments");
};

const createPost = async (title, content, userId) => {
  const newPost = new Post({ title, content, user: userId });
  await newPost.save();
  return await User.findByIdAndUpdate(
    userId,
    { $push: { posts: newPost._id } },
    { new: true }
  ).populate("posts");
};

const getAllComments = async () => {
  return await Comment.find().populate({
    path: "post",
    populate: {
      path: "user",
      model: "User",
    },
  });
};

const createComment = async (message, postId, userId) => {
  const newComment = new Comment({ message, post: postId, user: userId });
  await newComment.save();

  return await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: newComment._id } },
    { new: true }
  ).populate("comments");
};

const getUsersWithPosts = async () => {
  try {
    const usersWithPosts = await User.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "user",
          as: "posts",
        },
      },
      {
        $addFields: {
          postCount: { $size: "$posts" },
        },
      },
      {
        $match: { postCount: { $gt: 0 } },
      },
    ]);
    return usersWithPosts;
  } catch (error) {
    console.error("Error in getUsersWithPosts", error);
    throw error;
  }
};

const getUsersWithMultipleComments = async () => {
  try {
    const usersWithMultipleComments = await User.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "user",
          as: "comments",
        },
      },
      {
        $addFields: {
          commentsCount: { $size: "$comments" },
        },
      },
      {
        $match: { commentsCount: { $gt: 2 } },
      },
    ]);
    return usersWithMultipleComments;
  } catch (error) {
    console.error("Error:", error);
  }
};

const deleteUserAndAllRegardingData = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
    await Post.deleteMany({ user: userId });
    await Comment.deleteMany({ user: userId });
  } catch (error) {
    throw new Error("Failed to delete user, posts, comments");
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getAllPosts,
  createPost,
  getAllComments,
  createComment,
  getUsersWithPosts,
  getUsersWithMultipleComments,
  deleteUserAndAllRegardingData,
};
