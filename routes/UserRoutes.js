//importações
import express from 'express';

//importações de controllers
import { loginUserCtrl, registerUserCtrl, getUserProfileCtrl } from '../controllers/UserController.js';

const userRoutes = express.Router()

//rotas
userRoutes.post('/register', registerUserCtrl)
userRoutes.post('/login', loginUserCtrl)
userRoutes.get('/profile', getUserProfileCtrl)

export default userRoutes;