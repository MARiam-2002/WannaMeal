import mongoose, { Schema, Types } from "mongoose";
const postSchema = new Schema(
  {
    postedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      max: 500,
    },
    img: {
      url: {
        type: String,
      },
      id: {
        type: String,
      },
    },
    video: {
      url: {
        type: String,
      },
      id: {
        type: String,
      },
    },
    likes: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
    replies: [
      {
        text: {
          type: String,
          required: true,
        },
        userId: {
          type: Types.ObjectId,
          ref: "User",
          required: true,
        },
        userProfilePic: {
          type: String,
        },
        userName: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);
const postModel =
  mongoose.models.postModel || mongoose.model("Post", postSchema);
export default postModel;
