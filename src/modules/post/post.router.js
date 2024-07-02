import { Router } from "express";
import * as postController from "./post.js";
// import postValidation from "./post.validation.js";
// import { isValidation } from "../../middleware/validation.middleware.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import auth from "../../middleware/auth.js";
import { requirePremium } from "../../middleware/Premium.js";
const router = Router();

router.post(
  "/create",
  auth,
  requirePremium,
  fileUpload([...filterObject.image, ...filterObject.video]).fields([
    { name: "img", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  postController.createPost
);
router.get("/feed", auth, requirePremium, postController.getFeedPosts);
router.get("/:id", auth, requirePremium, postController.getPost);
router.get(
  "/user/:userName",
  auth,
  requirePremium,
  postController.getUserPosts
);
router.get("/", postController.getPosts);

router.delete("/:id", auth, requirePremium, postController.deletePost);
router.put("/like/:id", auth, requirePremium, postController.likeUnLikePost);
router.put("/reply/:id", auth, requirePremium, postController.replyToPost);

export default router;
