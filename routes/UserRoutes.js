//importações
import express from 'express';

//importações de controllers
import { loginUserCtrl, registerUserCtrl, getUserProfileCtrl, updateShippingAddressCtrl } from '../controllers/UserController.js';

//importações de middlewares
import { isLoggedIN } from '../middlewares/isLoggedIn.js';

const userRoutes = express.Router()

//rotas
userRoutes.post('/register', registerUserCtrl)
userRoutes.post('/login', loginUserCtrl)
userRoutes.get('/profile', isLoggedIN, getUserProfileCtrl)
userRoutes.put('/update/shipping', isLoggedIN, updateShippingAddressCtrl)

export default userRoutes;