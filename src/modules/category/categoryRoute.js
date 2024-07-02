import express from 'express';
import { allowedTo }  from "../auth/controller/auth.js"
import auth from "../../middleware/auth.js";

import {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
} from "./categoryValidator.js" 
import { 
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
 } from './categoryController.js';

import ingredientRoute from "../ingredient/ingredientRoute.js"


const router = express.Router();

router.use('/:categoryId/ingredients', ingredientRoute);


router.post('/addCategory', auth, allowedTo, createCategoryValidator, createCategory); 
router.get('/getCategories', auth, getCategories);
router.get('/getCategory/:id', auth, allowedTo, getCategoryValidator, getCategory);
router.put('/updateCategory/:id', auth, allowedTo, updateCategoryValidator, updateCategory); 
router.delete('/deleteCategory/:id', auth, allowedTo, deleteCategoryValidator, deleteCategory);

export default router;
