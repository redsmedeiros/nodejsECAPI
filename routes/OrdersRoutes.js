import express from 'express';
import { createOrderCtrl } from '../controllers/OrderController.js';

const ordersRoutes = express.Router();

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
ordersRoutes.post('/', isLoggedIN, createOrderCtrl)

export default ordersRoutes;