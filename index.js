import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
// import { asyncHandler } from "./src/utils/asyncHandler.js";
// import { Server } from "socket.io";
// import messageModel from "./DB/models/message.model.js";
// import conversationModel from "./DB/models/conversation.model.js";

//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express'
import initApp from './src/index.router.js'
import connectDB from './DB/connection.js'
const app = express()

// setup port and the baseUrl
const port = process.env.PORT 
initApp(app ,express)
connectDB();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//socket.io social network private chat

// export const io = new Server(server, { cors: "*" });

// export const getRecipientSocketId = (recipientId) => {
//   return userSocketMap[recipientId];
// };

// const userSocketMap = {}; // userId: socketId

// io.on("connection", (socket) => {
//   console.log("user connected", socket.id);
//   const userId = socket.handshake.query.userId;

//   if (userId != "undefined") userSocketMap[userId] = socket.id;
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   socket.on(
//     "markMessagesAsSeen",
//     asyncHandler(async ({ conversationId, userId }) => {
//       await messageModel.updateMany(
//         { conversationId: conversationId, seen: false },
//         { $set: { seen: true } }
//       );
//       await conversationModel.updateOne(
//         { _id: conversationId },
//         { $set: { "lastMessage.seen": true } }
//       );
//       io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
//     })
//   );

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });
