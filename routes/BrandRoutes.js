import express from "express";
import { createBrandCtrl, deleteBrandCtrl, getAllBrandsCtrl, getSingleBrandCtrl, updateBrandCtrl } from "../controllers/BrandController";

const brandRoutes = express.Router();

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
categoryRoutes.post('/', isLoggedIN, createBrandCtrl)
categoryRoutes.get('/', getAllBrandsCtrl)
categoryRoutes.get('/:id', getSingleBrandCtrl)
categoryRoutes.put('/:id', isLoggedIN, updateBrandCtrl)
categoryRoutes.delete('/:id/delete', isLoggedIN, deleteBrandCtrl)

export default brandRoutes;