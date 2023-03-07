import express from 'express';
import { createOrderCtrl, getAllOrdersCtrl, getSalesSumCtrl, getSingleOrdersCtrl, updateOrderToDelivery } from '../controllers/OrderController.js';

const ordersRoutes = express.Router();

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
ordersRoutes.post('/', isLoggedIN, createOrderCtrl)
ordersRoutes.get('/', isLoggedIN, getAllOrdersCtrl)
ordersRoutes.get('/:id', isLoggedIN, getSingleOrdersCtrl)
ordersRoutes.put('/update/:id', isLoggedIN, updateOrderToDelivery)
ordersRoutes.get('/sales/sum', getSalesSumCtrl)

export default ordersRoutes;