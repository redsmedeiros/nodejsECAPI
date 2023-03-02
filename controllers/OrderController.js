import Order from "../model/Order.js"
import User from "../model/User.js"
import Model from "../model/Product.js"
import expressAsyncHandler from "express-async-handler"
import Product from "../model/Product.js"

//@desc Create new Order
//@route POST /api/v1/orders
//@access Private
export const createOrderCtrl = expressAsyncHandler( async (req, res)=>{

   //pegar o payload
   const { orderItems, shippingAddress, totalPrice } = req.body

   //encontrar o usuario
   const user = await User.findById(req.userAuthId)

   //verificar se orders está vazio
   if(orderItems?.length <= 0){
      throw new Error('No order itens')
   }

   //criar o order
   const order = await Order.create({
      user: user?._id,
      shippingAddress,
      totalPrice
   })

   //push order no usuario
   user.orders.push(order)

   //salvar novamente o user
   await user.save()

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
})