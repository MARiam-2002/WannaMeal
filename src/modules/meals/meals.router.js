import { Router } from "express";
import * as mealController from "./controller/meals.js";
import { fileUpload, filterObject } from "../../utils/multer.js";
import * as validators from "./meals.validation.js";
import auth from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
const router = Router({ mergeParams: true });

router.post(
  "/addAnewRecipe",
  auth,
  fileUpload(filterObject.image).single("image"),
  validation(validators.addAnewRecipe),
  mealController.addAnewRecipe
);
router.post(
  "/isSaved",
  auth,
  fileUpload(filterObject.image).single("image"),
  mealController.isSaved
);
router.delete(
  "/deleteMeal/:mealId",
  auth,
  validation(validators.mealId),
  mealController.deleteMeal
);
router.get(
  "/recommendMeal",
  validation(validators.recommendMeal),
  mealController.recommendMeal
);
router.get("/common-meals",auth, mealController.commonMeals);
router.put("/ratting/:mealId",auth,mealController.rattingMeal)
router.get("/getUserRatting",mealController.getUserRatting)
router.get("/", mealController.getallMeal);
router.get(
  "/single/:mealId",
  validation(validators.mealId),
  mealController.getMealId
);
export default router;
