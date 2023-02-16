//importações
import express from 'express';

//importações de controllers
import { registerUserCtrl } from '../controllers/UserController.js';

const userRoutes = express.Router()

//rotas
userRoutes.post('/api/v1/users/register', registerUserCtrl)

export default userRoutes;