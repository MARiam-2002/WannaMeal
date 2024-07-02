// routes/auth.js
import { Router } from "express";
import * as messageController from "./controller/message.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import auth from "../../middleware/auth.js";
import { requirePremium } from "../../middleware/Premium.js";
const router = Router();
router.get(
  "/conversation",
  auth,
  requirePremium,
  messageController.getConversations
);
router.get("/:otherUserId", auth,requirePremium, messageController.getMessages);
router.post(
  "/send/:id",
  auth,
  requirePremium,
  fileUpload(filterObject.image).single("img"),
  messageController.sendMessage
);

export default router;
