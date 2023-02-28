import express from "express";
import { createColorCtrl, deleteColorCtrl, getAllColorsCtrl, getSingleColorCtrl, updateColorCtrl } from "../controllers/ColorController.js";

const colorRoutes = express.Router();

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
colorRoutes.post('/', isLoggedIN, createColorCtrl)
colorRoutes.get('/', getAllColorsCtrl)
colorRoutes.get('/:id', getSingleColorCtrl)
colorRoutes.put('/:id', isLoggedIN, updateColorCtrl)
colorRoutes.delete('/:id/delete', isLoggedIN, deleteColorCtrl)

export default colorRoutes; 