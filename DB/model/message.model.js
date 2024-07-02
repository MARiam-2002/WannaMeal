import mongoose, { Schema, Types, model } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    seen: {
			type: Boolean,
			default: false,
		},
		img: {
      id: String,
      url: String,
		},
  },
  { timestamps: true }
);
const messageModel =
  mongoose.models.messageModel || model("Message", messageSchema);
export default messageModel;
