import express from 'express';
import { createCouponCtrl } from '../controllers/CouponController.js';

const couponRoutes = express.Router();

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
couponRoutes.post('/', isLoggedIN, createCouponCtrl);

export default couponRoutes;