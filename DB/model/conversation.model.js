import mongoose, { Schema, Types, model } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      text: String,
      senderId: { type: Schema.Types.ObjectId, ref: "User" },
      seen: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const conversationModel =
  mongoose.models.conversationModel ||
  model("Conversation", conversationSchema);
export default conversationModel;
