import express from 'express';
import { createCouponCtrl, deleteCouponCtrl, getAllCouponCtrl, getSingleCouponCtrl, updateCouponCtrl } from '../controllers/CouponController.js';

const couponRoutes = express.Router();

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
couponRoutes.post('/', isLoggedIN, createCouponCtrl);
couponRoutes.get('/', getAllCouponCtrl);
couponRoutes.get('/:id', getSingleCouponCtrl);
couponRoutes.put('/:id', updateCouponCtrl);
couponRoutes.delete('/:id', deleteCouponCtrl)

export default couponRoutes;