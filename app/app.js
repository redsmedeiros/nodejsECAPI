//importar o express
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import dbConnect from '../config/dBconnect.js';
import userRoutes from '../routes/UserRoutes.js';



//instanciar o express
const app = express()
dbConnect()
app.use(express.json())

//rotas
app.use('/', userRoutes)

export default app;