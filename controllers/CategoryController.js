import Category from "../model/Category.js"
import expressAsyncHandler from "express-async-handler";

//@desc Create new category
//@route POST /api/v1/categories
//@access Private/admin

export const createCategoryCtrl = expressAsyncHandler(async(req, res)=>{

    const { name } = req.body

    const categoryFound = await Category.findOne({name})

    //verificar existencia
    if(categoryFound){
        throw new Error('Category already exists')
    }

    const category = await Category.create({
        name,
        user: req.userAuthId
    })

    res.json({
        status: "success",
        message: "Category created successfully",
        category
    })
})

//@desc Get all category
//@route GET /api/v1/categories
//@access Public

export const getAllCategoryCtrl = expressAsyncHandler(async (req, res)=>{

    const categories = await Category.find()

    res.json({
        status: "success",
        message: "Categories fetched successfully",
        categories
    })

})

//@desc Get single category
//@route GET /api/v1/categories/:id
//@access Public

export const getSingleCategoryCtrl = expressAsyncHandler(async (req, res)=>{

    const category = await Category.findById(req.params.id)

    res.json({
        status: "success",
        message: "Category fetched successfully",
        category
    })

})

//@desc Update single category
//@route PUT /api/v1/categories/:id
//@access Private/Admin
export const updateCategoryCtrl = expressAsyncHandler(async (req, res)=>{

    const { name } = req.body

    const category = Category.findByIdAndUpdate(req.params.id, 
        { 
            name, 
        }, 
        { 
            new: true
        })

    res.json({
        status: "success",
        message: "category updated successfully",
        category
    })

})

//@desc Update single category
//@route PUT /api/v1/categories/:id
//@access Private/Admin
export const deleteCategoryCtrl = expressAsyncHandler( async (req, res)=>{

    await Category.findByIdAndDelete(req.params.id)

    res.json({
        status: "success",
        message: "Product deleted successfully"
    })
})