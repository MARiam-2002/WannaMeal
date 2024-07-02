import express from "express";
import { allowedTo }  from "../auth/controller/auth.js"
import auth from "../../middleware/auth.js";

import {
  createIngredientValidator,
  getIngredientValidator,
  updateIngredientValidator,
  deleteIngredientValidator,
} from "./ingredientValidator.js";

import {
  getIngredients,
  createIngredient,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
  createFilterObj,
} from "./ingredientController.js";

// mergeParams: Allow us to access parameters on other routers(first)
// ex: We need to access categoryId from category router
const router = express.Router({ mergeParams: true }); //child

router.post(
  "/addIngredient",
  auth,
  allowedTo,
  createIngredientValidator,
  createIngredient
);
router.get("/getAll", auth, createFilterObj, getIngredients);
router.get("/getIngredient/:id", auth, allowedTo, getIngredientValidator, getIngredientById);
router.put(
  "/updateIngredient/:id",
  auth,
  allowedTo,
  updateIngredientValidator,
  updateIngredient
);
router.delete(
  "/deleteIngredient/:id",
  auth,
  allowedTo,
  deleteIngredientValidator,
  deleteIngredient
);

export default router;
