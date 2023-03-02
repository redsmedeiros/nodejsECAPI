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
import Stripe from "stripe";



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

//stripe webhook
const stripe = new Stripe(process.env.STRIPE_KEY);

const endpointSecret = "whsec_82d652e076f52dc3e35eafa0c145df4d67fbd5d81bef6148324cbb236d77c155";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
});  

//error midlleware
app.use(notFound)
app.use(globalErrorHandler)

export default app;