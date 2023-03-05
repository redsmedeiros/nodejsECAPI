import Coupon from "../model/Coupon.js";
import expressAsyncHandler from "express-async-handler";

//@desc Register coupon
//@route POST /api/v1/coupon
//@access Private/admin
export const createCouponCtrl = expressAsyncHandler( async (req, res)=>{

    //pegar os dados que vieram do front
    const { code, startDate, endDate, discount } = req.body;

    //verificar se o coupon existe
    const couponExists = await Coupon.findOne({ code })

    //jogar erro se o coupon ja foi cadastrado
    if(couponExists){
        throw new Error('Coupon already exists')
    }

    //verificar se o desconto é do tipo number - isNan metodo nos dis se é numero ou não
    if(isNaN(discount)){
        throw new Error('Discount value is not a number')
    }

    //criar o cupon
    const coupon = await Coupon.create({
        code: code?.toUpperCase(),
        startDate,
        endDate,
        discount,
        user: req.userAuthId
    })

    //enviar a resposta
    res.json({ 
        status: 'success',
        message: 'Coupon created successfully',
        coupon
    })
})

//@desc Get all coupon
//@route GET /api/v1/coupon
//@access Private/admin
export const getAllCouponCtrl = expressAsyncHandler( async (req, res)=>{

    const coupons = await Coupon.find()

    res.status(200).json({
        status: "success",
        message: "All coupons",
        coupons
    });
})
