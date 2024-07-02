import { Router } from "express";
import * as famillyController from "./controller/famiily.js";
import auth from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as Validators from "./familly.validation.js";
const router = Router();

router.patch(
  "/addOrDeleteAdults",
  auth,
  validation(Validators.addOrDelete),
  famillyController.addOrDeleteAdults
);
router.patch(
  "/addOrDeleteBabies",
  auth,
  validation(Validators.addOrDelete),
  famillyController.addOrDeleteBabies
);
router.patch(
  "/addOrDeleteChildren",
  auth,
  validation(Validators.addOrDelete),
  famillyController.addOrDeleteChildren
);

export default router;
