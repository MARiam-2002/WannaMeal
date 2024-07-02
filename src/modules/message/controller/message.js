// import { getRecipientSocketId, io } from "../../../../index.js";
import userModel from "../../../../DB/model/User.model.js";
import conversationModel from "../../../../DB/model/conversation.model.js";
import messageModel from "../../../../DB/model/message.model.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { message } = req.body;
  const { id } = req.params;
  const senderId = req.user._id;
  const user = await userModel.findById(id);
  if (!user) {
    return next(new Error("Recipient not found", { cause: 404 }));
  }
  let conversation = await conversationModel.findOne({
    participants: { $all: [senderId, id] },
  });
  if (!conversation) {
    conversation = await conversationModel.create({
      participants: [senderId, id],
      lastMessage: {
        senderId,
        text: message,
      },
    });
  }

  const newMessage = await messageModel.create({
    conversationId: conversation._id,
    senderId,
    text: message,
  });
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.FOLDER_CLOUDINARY}/message/${conversation._id}`,
      }
    );
    newMessage.img = {
      id: public_id,
      url: secure_url,
    };
    await newMessage.save();
  }
  conversation.lastMessage = {
    senderId,
    text: message,
  };
  await conversation.save();

  // const recipientSocketId = getRecipientSocketId(recipientId);
  // 	if (recipientSocketId) {
  // 		io.to(recipientSocketId).emit("newMessage", newMessage);
  // 	}

  return res.status(201).json({
    success: true,
    data: newMessage,
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const { otherUserId } = req.params;
  const userId = req.user._id;
  const conversation = await conversationModel.findOne({
    participants: { $all: [userId, otherUserId] },
  });
  if (!conversation) {
    return res
      .status(404)
      .json({ success: false, message: "No conversation found" });
  }
  const messages = await messageModel
    .find({
      conversationId: conversation._id,
    })
    .sort({ createdAt: 1 });
  return res.status(200).json({ success: true, messages });
});

export const getConversations = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const conversations = await conversationModel
    .find({ participants: userId })
    .populate({ path: "participants", select: "userName profileImage" });
  conversations.forEach((conversation) => {
    conversation.participants = conversation.participants.filter(
      (participant) => participant._id.toString() !== userId.toString()
    );
  });
  return res.status(200).json({ success: true, conversations });
});
