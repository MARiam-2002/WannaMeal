import userModel from "../../../DB/model/User.model.js";
import postModel from "../../../DB/model/post.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const createPost = asyncHandler(async (req, res, next) => {
  const { postedBy, text } = req.body;
  if (!postedBy || !text) {
    return next(new Error("postedBy and text is required", { cause: 404 }));
  }
  const user = await userModel.findById(postedBy);
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  if (user._id.toString() !== req.user._id.toString()) {
    return next(
      new Error("You are not authorized to create post", { cause: 401 })
    );
  }
  const max = 500;
  if (text.length > max) {
    return next(
      new Error(`Text length should be less than ${max}`, { cause: 400 })
    );
  }
  const post = await postModel.create({
    postedBy,
    text,
  });
  if (req.files && req.files.img) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.img[0].path,
      {
        folder: `${process.env.FOLDER_CLOUDINARY}/post/${post.postedBy}/img`,
      }
    );
    post.img = { url: secure_url, id: public_id };
    await post.save();
  }
  if (req.files && req.files.video) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.files.video[0].path,
      {
        resource_type: "video",
        folder: `${process.env.FOLDER_CLOUDINARY}/post/${post.postedBy}/video`,
      }
    );
    post.video = { url: secure_url, id: public_id };
    await post.save();
  }
  res
    .status(201)
    .json({ success: true, message: "Post created successfully", post });
});

export const getPost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await postModel.findById(id);
  if (!post) {
    return next(new Error("Post not found", { cause: 404 }));
  }
  return res.status(200).json({ success: true, data: post });
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await postModel.findById(id);
  if (!post) {
    return next(new Error("Post not found", { cause: 404 }));
  }
  if (post.postedBy.toString() !== req.user._id.toString()) {
    return next(
      new Error("You are not authorized to delete this post", { cause: 401 })
    );
  }
  if (post.img) {
    await cloudinary.uploader.destroy(post.img.id);
  }
  await postModel.findByIdAndDelete(id);
  return res.status(200).json({ success: true, message: "Post deleted" });
});

export const likeUnLikePost = asyncHandler(async (req, res, next) => {
  const { id: postId } = req.params;
  const userId = req.user._id;
  const post = await postModel.findById(postId);
  if (!post) {
    return next(new Error("Post not found", { cause: 404 }));
  }
  const userLikedPost = post.likes.includes(userId);
  console.log(userLikedPost);
  if (userLikedPost) {
    //Unlike post
    await postModel.updateOne({ _id: postId }, { $pull: { likes: userId } });
    return res.status(200).json({ success: true, message: "Post unliked" });
  } else {
    //Like post
    await postModel.updateOne({ _id: postId }, { $push: { likes: userId } });
    return res.status(200).json({ success: true, message: "Post liked" });
  }
});

export const replyToPost = asyncHandler(async (req, res, next) => {
  const { id: postId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;
  const profileImage = req.user.profileImage;
  const userName = req.user.userName;

  if (!text) {
    return next(new Error("Text is required", { cause: 400 }));
  }
  const post = await postModel.findById(postId);

  if (!post) {
    return next(new Error("Post not found", { cause: 404 }));
  }
  const reply = {
    text,
    userId,
    userProfilePic: profileImage.url,
    userName,
  };
  post.replies.push(reply);
  await post.save();
  return res
    .status(200)
    .json({ success: true, message: "Reply added successfully!", reply });
});

export const getFeedPosts = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }

  const following = user.following;
  const feedPosts = await postModel
    .find({ postedBy: { $in: following } })
    .sort({ createdAt: -1 });
  return res.status(200).json({ success: true, feedPosts });
});

export const getUserPosts = asyncHandler(async (req, res, next) => {
  const { userName } = req.params;
  const user = await userModel.findOne({ userName });
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  const posts = await postModel
    .find({ postedBy: user._id })
    .sort({ createdAt: -1 });
  return res.status(200).json({ success: true, posts });
});

export const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await postModel.find().sort({ createdAt: -1 });
  return res.status(200).json({ success: true, posts });
});