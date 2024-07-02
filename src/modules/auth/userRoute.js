import { Router } from "express";

import * as userService from "./controller/userService.js";
import auth from "../../middleware/auth.js";
import * as validator from "../auth/userValidator.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo }  from "./controller/auth.js"

const router = Router();

router.get("/getMe", auth, userService.getLoggedUserData, userService.getUser);
router.put(
  "/updateMe",
  auth,
  validation(validator.updateLoggedUserValidator),
  userService.updateLoggedUserData
);


router
  .route("/")
  .get(auth,allowedTo,userService.getUsers)
  .post(auth,allowedTo, validation(validator.createUserValidator), userService.createUser);

router
  .route("/:id")
  .get(auth,allowedTo, validation(validator.getUserValidator), userService.getUser)
  .put(auth,allowedTo, validation(validator.updateUserValidator), userService.updateUser)
  .delete(auth,allowedTo, validation(validator.deleteUserValidator), userService.deleteUser);

export default router;
