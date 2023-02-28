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

//@desc Get all grands
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

//@desc Get single brand
//@route GET /api/v1/:id
//@access Public
export const getSingleBrandCtrl = expressAsyncHandler(async (req, res)=>{

    const brand = await Brand.findById(req.params.id);

    res.json({
        status: "success",
        message: "Brand fetched succesfully",
        brand
    })

})

//@desc Update brand
//@route PUT /api/v1/:id
//@access Private/Admin
export const updateBrandCtrl = expressAsyncHandler(async (req, res)=>{

    const { name } = req.body;

    const brand = await Brand.findByIdAndUpdate(req.params.id, {
        name
    },
    {
        new: true
    })

    res.json({
        status: "success",
        message: "Brand fetched succesfully",
        brand
    })
})

//@desc delete brand
//@route DELETE /api/v1/:id
//@access Private/Admin
export const deleteBrandCtrl = expressAsyncHandler( async (req, res)=>{

    await Brand.findByIdAndDelete(req.params.id)

    res.json({
        status: "success",
        message: "Brand delete succesfully"
    })
})