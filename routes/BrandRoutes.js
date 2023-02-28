import express from "express";
import { createBrandCtrl, deleteBrandCtrl, getAllBrandsCtrl, getSingleBrandCtrl, updateBrandCtrl } from "../controllers/BrandController.js";

const brandRoutes = express.Router();

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
brandRoutes.post('/', isLoggedIN, createBrandCtrl)
brandRoutes.get('/', getAllBrandsCtrl)
brandRoutes.get('/:id', getSingleBrandCtrl)
brandRoutes.put('/:id', isLoggedIN, updateBrandCtrl)
brandRoutes.delete('/:id/delete', isLoggedIN, deleteBrandCtrl)

export default brandRoutes;