import express from "express";

const categoryRoutes = express.Router()

import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoryCtrl, getSingleCategoryCtrl, updateCategoryCtrl } from '../controllers/CategoryController.js'

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
categoryRoutes.post('/', isLoggedIN, createCategoryCtrl)
categoryRoutes.get('/', isLoggedIN, getAllCategoryCtrl)
categoryRoutes.get('/:id', isLoggedIN, getSingleCategoryCtrl)
categoryRoutes.put('/:id', isLoggedIN, updateCategoryCtrl)
categoryRoutes.delete('/:id/delete', isLoggedIN, deleteCategoryCtrl)

export default categoryRoutes;