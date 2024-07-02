// import Joi from 'joi';
import { check , body } from "express-validator"
import validatorMiddleware from "../../middleware/validatorMiddleware.js"
import slugify from "slugify"


import  Category  from "../../../DB/model/categoryModel.js"

export const createIngredientValidator = [
  check('name')
    .notEmpty()
    .withMessage('ingredient required')
    .isLength({ min: 2 })
    .withMessage('Too short ingredient name')
    .isLength({ max: 32 })
    .withMessage('Too long ingredient name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
    check('category')
    .notEmpty()
    .withMessage('ingredient must be belong to a category')
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom((categoryId) =>//does category already in DB or not 
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),
  validatorMiddleware,
];

export const getIngredientValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];

export const updateIngredientValidator = [
  check('id').isMongoId().withMessage('Invalid Ingredient id format'),
  body('name').custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check('category')
    .notEmpty()
    .withMessage('ingredient must be belong to a category')
    .isMongoId()
    .withMessage('Invalid ID formate')
    .custom((categoryId) =>//does category already in DB or not 
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),
  validatorMiddleware,
];

export const deleteIngredientValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];

// const ingredientSchema = Joi.object({
//     name: Joi.string().required(),
//     category: Joi.string()
//     .required()
//     .messages({
//       'any.required': 'Product must be belong to category',
//       'string.empty': 'Product must be belong to category'
//     })
//     .pattern(/^[0-9a-fA-F]{24}$/)
//     .messages({
//       'string.pattern.base': 'Invalid Category id format'
//     })
//     .external(async (value, helpers) => {
//       const category = await Category.findById(value);
//       if (!category) {
//         throw new Error(`No category for this id: ${value}`);
//       }
//     })
// });

// export default ingredientSchema;
