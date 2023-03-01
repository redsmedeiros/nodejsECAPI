//importar o express
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import dbConnect from '../config/dBconnect.js';
import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js';
import brandRoutes from '../routes/BrandRoutes.js';
import categoryRoutes from '../routes/CategoryRoutes.js';
import colorRoutes from '../routes/ColorRoutes.js';
import ordersRoutes from '../routes/OrdersRoutes.js';
import productRoutes from '../routes/ProductRoutes.js';
import reviewRoutes from '../routes/ReviewRoutes.js';
import userRoutes from '../routes/UserRoutes.js';



//instanciar o express
const app = express()
dbConnect()
app.use(express.json())

//rotas
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/brands', brandRoutes)
app.use('/api/v1/colors', colorRoutes)
app.use('/api/v1/reviews/', reviewRoutes)
app.use('/api/v1/orders/', ordersRoutes)

//error midlleware
app.use(notFound)
app.use(globalErrorHandler)

export default app;