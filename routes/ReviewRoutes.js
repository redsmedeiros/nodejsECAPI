import express from "express";
import { createReviewCtrl } from "../controllers/ReviewController.js";

const reviewRoutes = express.Router()

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

//rotas
reviewRoutes.post('/:productID', isLoggedIN, createReviewCtrl)

export default reviewRoutes;