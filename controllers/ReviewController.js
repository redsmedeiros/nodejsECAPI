import expressAsyncHandler from "express-async-handler";
import Review from '../model/Review.js'
import Product from "../model/Product.js";

//@desc Create new Review
//@route POST /api/v1/reviews
//@access Private/admin
export const createReviewCtrl = expressAsyncHandler( async(req, res)=>{

    const { product, message, rating } = req.body

    //verificar o produto
    const { productID } = req.params

    const productFound = await Product.findById(productID).populate('reviews')

    if(!productFound){
        throw new Error('Product not found')
    }

    //verificar se o usuario fez o review
    const hasReview = productFound?.reviews?.find((review)=> review?.user?.toString() === req?.userAuthId?.toString())
    
    if(hasReview){
        throw new Error('You have already reviewed this product')
    }

    //criar o review
    const review = await Review.create({
        message,
        rating,
        product: productFound?._id,
        user: req.userAuthId
    })

    //colocar o review no produto
    productFound.reviews.push(review?._id)

    await productFound.save()

    res.status(201).json({
        success: true,
        message: "Review created successfully"
    })
})