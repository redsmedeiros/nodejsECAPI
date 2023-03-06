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

   //pegar o coupon
   const { coupon } = req?.query

 
   const couponFound = await Coupon.findOne({
      code: coupon?.toUpperCase()
   })

   if(couponFound?.isExpired){
      throw new Error('Coupon has expired')
   }

   if(!couponFound){
      throw new Error('Coupon does not exist')
   }

   //obter o desconto
   const discount = couponFound?.discount / 100;
   

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
      totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice
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

   //converter os dados
   const convertedOrders = orderItems.map((item)=>{
      return {
         price_data: {
            currency: 'usd',
            product_data:{
               name: item?.name,
               description: item?.description
            },
            unit_amount: 10 * 100
         },
         quantity: item?.price * 100
      }
   })

   //consumir api de pagamentos
   const session = await stripe.checkout.sessions.create({
      line_items: convertedOrders,
      metadata: {
         orderId: JSON.stringify(order?._id)
      },
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
   })

   res.send({url: session.url})

})

//@desc get All orders
//@route GET /api/v1/orders
//@access Private
export const getAllOrdersCtrl = expressAsyncHandler( async (req, res)=>{
   
   const orders = await Order.find()

   res.json({
      success: true,
      message: "All orders",
      orders
   })
})

//@desc get sungle orders
//@route GET /api/v1/orders/:id
//@access Private
export const getSingleOrdersCtrl = expressAsyncHandler( async (req,res)=>{

   const order = await Order.findById(req.params.id)

   res.json({
      success: true,
      message: 'Single Order',
      order
   })
})

//@desc update order to delivered
//@route PUT /api/v1/orders//update:id
//@access Private/adim
export const updateOrderToDelivery = expressAsyncHandler( async (req, res)=>{

      const id = req.params.id

      const updateOrder = await Order.findByIdAndUpdate(id, {
         status: req.body.status
      }, { new: true})

      res.status(200).json({
         success: true,
         message: "Order delivered",
         updateOrder
      })
})