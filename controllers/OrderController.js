import Order from "../model/Order.js";
import User from "../model/User.js";
import expressAsyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_KEY);

//@desc Create new Order
//@route POST /api/v1/orders
//@access Private
export const createOrderCtrl = expressAsyncHandler( async (req, res)=>{

   //pegar o payload
   const { orderItems, shippingAddress, totalPrice } = req.body

   //encontrar o usuario
   const user = await User.findById(req.userAuthId)

   //verificar shipping address
   if(!user?.hasShippingAddress){
      throw new Error('Please provide shipping address')
   }

   //verificar se orders está vazio
   if(orderItems?.length <= 0){
      throw new Error('No order items')   
   }

   //criar o order
   const order = await Order.create({
      user: user?._id,
      shippingAddress,
      totalPrice
   })


   //procurar por produtos que tenham orderItems com o mesmo _id
   const products = await Product.find({_id: {$in: orderItems}})

   orderItems?.map(async (everyOrderObj)=>{

      const product = products?.find((product)=>{
         return product?._id.toString() === everyOrderObj?._id.toString()
      })

      if(product){
         product.totalSold += everyOrderObj.qty
      }

      await product.save()
   })

   //push order no usuario
   user.orders.push(order)

   //salvar novamente o user
   await user.save()

   //consumir api de pagamentos
   const session = await stripe.checkout.sessions.create({
      line_items:[{
         price_data:{
            currency: 'usd',
            product_data: {
               name: 'Hats',
               description: 'Best hat'
            },
            unit_amount: 10 * 100
         },
         quantity: 2
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
   })

   res.send({url: session.url})

})