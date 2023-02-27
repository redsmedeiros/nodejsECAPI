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