//importações
import express from 'express';

//importações de controllers
import { createProductCtrl, deleteProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from '../controllers/ProductController.js';

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';
import upload from '../config/fileUpload.js'

const productRoutes = express.Router()

//rotas
productRoutes.post('/', isLoggedIN, upload.single('file'), createProductCtrl)
productRoutes.get('/', getProductsCtrl)
productRoutes.get('/:id', getProductCtrl)
productRoutes.put('/:id', isLoggedIN, updateProductCtrl)
productRoutes.delete('/:id/delete', isLoggedIN, deleteProductCtrl)

export default productRoutes;