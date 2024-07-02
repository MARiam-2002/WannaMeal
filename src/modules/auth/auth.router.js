import { Router } from "express";
import * as Validators from "./auth.validation.js";
import { validation } from "../../middleware/validation.js";
import auth from "../../middleware/auth.js";
import * as userController from "./controller/auth.js";
import passport from "passport";
import { fileUpload, filterObject } from "../../utils/multer.js";
import { requirePremium } from "../../middleware/Premium.js";

//////tip/////
// import { createTip, getAllTips } from '../tip/tipController.js';
// import {validate} from '../../middleware/tipValidate.js';
// import tipValidator from '../tip/tipValidator.js';

const router = Router();

router.get(
  "/profile/:query",
  auth,
  validation(Validators.getProfile),
  requirePremium,
  userController.getProfile
);
router.get(
  "/suggested",
  auth,
  validation(Validators.lang),
  requirePremium,
  userController.getSuggestedUsers
);


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/login/failed", (req, res, next) => {
  res.status(401).json({ error: true, message: "login failure" });
});
router.get("/login/success", async (req, res, next) => {
  if (req.user) {
    req.user.status = "online";
    req.user.isConfirmed = true;
    await req.user.save();
    return res
      .status(200)
      .json({ error: false, message: "Successfully Login", user: req.user });
  } else {
    return res.status(403).json({ error: true, message: "not Authorized" });
  }
});
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "https://fast-plat1.vercel.app/auth/login/success",
    failureRedirect: "https://fast-plat1.vercel.app/auth/login/failed",
  })
);
router.post(
  "/register",
  validation(Validators.registerSchema),
  userController.register
);

router.get(
  "/confirmEmail/:activationCode",
  validation(Validators.activateSchema),
  userController.activationAccount
);

router.post("/login", validation(Validators.login), userController.login);

//send forget password

router.patch(
  "/forgetCode",
  validation(Validators.forgetCode),
  userController.sendForgetCode
);
router.patch(
  "/VerifyCode",
  auth,
  validation(Validators.verify),
  userController.VerifyCode
);
router.patch(
  "/resetPassword",
  auth,
  validation(Validators.resetPassword),
  userController.resetPasswordByCode
);
router.post(
  "/follow/:id",
  auth,
  validation(Validators.followUnFollowUser),
  requirePremium,
  userController.followUnFollowUser
);
router.put(
  "/update/:id",
  auth,
  validation(Validators.update),
  requirePremium,
  fileUpload(filterObject.image).single("imageProfile"),
  userController.update
);
router.put(
  "/update-premium/:userId",
  auth,
  validation(Validators.updatePremium),
  userController.updatePremium
);
router.put(
  "/freeze",
  auth,
  validation(Validators.lang),
  requirePremium,
  userController.freezeAccount
);



export default router;
