import asyncHandler from "express-async-handler";
import slugify from "slugify";

import Ingredient from "../../../DB/model/ingredientModel.js";


export const createIngredient = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.name);
  const ingredient = await Ingredient.create(req.body);
  res.status(201).json({ data: ingredient });
});


// Nested route
// GET /api/v1/categories/:categoryId/ingedients/getAll
export const createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

export const getIngredients = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 55;
  const skip = (page - 1) * limit;

  const ingredient = await Ingredient.find(req.filterObj)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });

  res.status(200).json({ results: ingredient.length, page, data: ingredient });
});

////////////////////////
export const getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id).populate({
      path: "category",
      select: "name",
    });
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });
    res.json(ingredient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateIngredient = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const ingredient = await Ingredient.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  if (!ingredient) {
    return res.status(404).json({ message: "Ingredient not found" });
  }
  res.status(200).json({ data: ingredient });
});

export const deleteIngredient = async (req, res) => {
  try {
    const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!deletedIngredient)
      return res.status(404).json({ message: "Ingredient not found" });
    res.json({ message: "Ingredient deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
