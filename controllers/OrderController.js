import Order from "../model/Order.js"
import expressAsyncHandler from "express-async-handler"

//@desc Create new Order
//@route POST /api/v1/orders
//@access Private
export const createOrderCtrl = expressAsyncHandler( async (req, res)=>{

   res.json({
        message: 'teste'
   })
})