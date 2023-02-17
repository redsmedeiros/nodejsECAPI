//importar o express
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import dbConnect from '../config/dBconnect.js';
import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js';
import userRoutes from '../routes/UserRoutes.js';



//instanciar o express
const app = express()
dbConnect()
app.use(express.json())

//rotas
app.use('/api/v1/users', userRoutes)

//error midlleware
app.use(notFound)
app.use(globalErrorHandler)

export default app;