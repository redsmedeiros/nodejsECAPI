import expressAsyncHandler from "express-async-handler";
import Color from '../model/Color.js'

//@desc Create new Color
//@route POST /api/v1/colors
//@access Private/admin
export const createColorCtrl = expressAsyncHandler( async (req, res)=>{

    const { name } = req.body;

    const colorFound = await Color.findOne({name});

    if(colorFound){
        throw new('Color already exist');
    };

    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthId
    })

    res.json({
        status: "succes",
        message: "Color created successfully",
        color
    })
})

//@desc Get all Colors
//@route GET /api/v1/colors
//@access Public
export const getAllColorsCtrl = expressAsyncHandler( async (req, res)=>{

    const colors = await Color.find()

    res.json({
        status: "success",
        message: "Color fetched successfully",
        colors
    })
})

//@desc Get single Color
//@route GET /api/v1/colors/:id
//@access Public
export const getSingleColorCtrl = expressAsyncHandler( async (req, res)=>{

    const color = await Color.findById(req.params.id)

    res.json({
        status: "success",
        message: "Color fetched successfully",
        color
    })


})

//@desc Update Color
//@route GET /api/v1/colors/:id
//@access Adim/ Private
export const updateColorCtrl = expressAsyncHandler( async (req, res)=>{

    const { name } = req.body;

    const color = await Color.findByIdAndUpdate(req.params.id, {
        name,
    },
    {
        new: true
    })

    res.json({
        status: "success",
        message: "Color updated successfully",
        color
    })
})

//@desc Delete Color
//@route DELETE /api/v1/colors/:id/delete
//@access Adim/ Private
export const deleteColorCtrl = expressAsyncHandler( async (req, res)=>{

    await Color.findByIdAndDelete(req.params.id)

    res.json({
        status: "success",
        message: "Color deleted successfully",
    
    })
})