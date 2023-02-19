//importações
import express from 'express';

//importações de controllers
import { createProductCtrl, getProductsCtrl } from '../controllers/ProductController.js';

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

const productRoutes = express.Router()

//rotas
productRoutes.post('/', isLoggedIN, createProductCtrl)
productRoutes.get('/', getProductsCtrl)

export default productRoutes;