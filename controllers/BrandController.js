import expressAsyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

//@desc Create new Brand
//@route POST /api/v1/brands
//@access Private/admin
export const createBrandCtrl = expressAsyncHandler( async (req, res)=>{

    const { name } = req.body

    //verificar existencia
    const brandFound = await Brand.findOne({ name })

    if(brandFound){
        throw new Error('Brand already exists')
    }

    //criar
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId
    })

    res.json({
        status: 'success',
        message: 'Brand created successfully',
        category
    })
})

//@desc Get all rands
//@route GET /api/v1/brands
//@access Public
export const getAllBrandsCtrl = expressAsyncHandler(async (req, res)=>{

    const brands = await Brand.find();

    res.json({
        status: "success",
        message: "Brand fetched successfully",
        brands
    });
})