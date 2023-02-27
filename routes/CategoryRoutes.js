import express from "express";

const categoryRoutes = express.Router()

import { createCategoryCtrl } from '../controllers/CategoryController.js'

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
categoryRoutes.post('/', createCategoryCtrl)

export default categoryRoutes;