import express from 'express';
import { createOrderCtrl, getAllOrdersCtrl, getSingleOrdersCtrl } from '../controllers/OrderController.js';

const ordersRoutes = express.Router();

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
ordersRoutes.post('/', isLoggedIN, createOrderCtrl)
ordersRoutes.get('/', isLoggedIN, getAllOrdersCtrl)
ordersRoutes.get('/:id', isLoggedIN, getSingleOrdersCtrl)

export default ordersRoutes;