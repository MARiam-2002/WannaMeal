import joi from "joi";
import { validateObjectId } from "../../middleware/validation.js";
const arrayParsing = (value, helper) => {
  value = JSON.parse(value);
  const valueSchema = joi.object({
    value: joi.array().items(joi.string().alphanum()),
  });
  const validationRes = valueSchema.validate({ value });
  if (validationRes.error) {
    return helper.message("invalid value of size");
  } else {
    return true;
  }
};
export const recommendMeal = joi
  .object({
    ingredients: joi.string().required(),
    lang: joi.string().valid("en", "ar"),
  })
  .required();
export const addAnewRecipe = joi.object({
  recipeName: joi.string().min(8).max(25).required(),
  information: joi.string().required().min(8).max(180),
  typeMeals: joi.string().valid("Lunch", "Dinner", "Breakfast").required(),
  ingredients: joi.string().custom(arrayParsing),
  steps: joi.string().custom(arrayParsing),
  times: joi.number().min(1).required(),
  calories: joi.number().min(1).required(),
  EnoughFor: joi.number().min(1).required(),
  size: joi.number().positive().required(),
  path: joi.string().required(),
  filename: joi.string().required(),
  destination: joi.string().required(),
  mimetype: joi.string().required(),
  encoding: joi.string().required(),
  originalname: joi.string().required(),
  fieldname: joi.string().required(),
});

export const mealId = joi
  .object({
    mealId: joi.string().custom(validateObjectId),
  })
  .required();
