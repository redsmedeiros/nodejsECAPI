import Product from "../model/Product.js";
import expressAsyncHandler from "express-async-handler";

//@desc Create new product
//@route POST /api/v1/products
//@access Private/admin

export const createProductCtrl = expressAsyncHandler(async (req, res)=>{


    //pegar as variaveis do corpo da req
    const {name, description, category, sizes, colors, user, price, totalQty, brand} = req.body

    //verificar a existencia
    const productExists = await Product.findOne({ name })

    if(productExists){
        throw new Error('Produto já cadastrado')
    }

    //criar o produto
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
        brand
    })

    //push o produto em uma categoria

    //enviar a resposta
    res.json({
        status: 'success',
        message: 'Produto criado com successo',
        product
    })
})

//@desc Get all products
//@route GET /api/v1/products
//@access Public

export const getProductsCtrl = expressAsyncHandler(async (req, res)=>{

    //pegar todos os produtos
    const products = await Product.find()

    res.json({
        status: 'success',
        products
    })
})