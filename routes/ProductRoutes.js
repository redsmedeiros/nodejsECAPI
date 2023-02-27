//importações
import express from 'express';

//importações de controllers
import { createProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from '../controllers/ProductController.js';

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

const productRoutes = express.Router()

//rotas
productRoutes.post('/', isLoggedIN, createProductCtrl)
productRoutes.get('/', getProductsCtrl)
productRoutes.get('/:id', getProductCtrl)
productRoutes.put('/:id', isLoggedIN, updateProductCtrl)

export default productRoutes;