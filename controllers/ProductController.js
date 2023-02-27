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

    //pega todos os produtos do banco
    let productQuery = Product.find()

    //verifica se tem algum parametro de busca opcional na url - products?name
    if(req.query.name){
        //filtra de acordo com o parametro
        productQuery = productQuery.find({
            name: {$regex: req.query.name, $options: "i"}
        })
    }

    if(req.query.brand){
        //filtra de acordo com o parametro - products?name=filtro&brand=filtro
        productQuery = productQuery.find({
            brand: {$regex: req.query.brand, $options: "i"}
        })
    }

    if(req.query.category){
        //filtra de acordo com o parametro - products?name=filtro&category=filtro
        productQuery = productQuery.find({
            category: {$regex: req.query.category, $options: "i"}
        })
    }

    if(req.query.colors){
        //filtra de acordo com o parametro - products?name=filtro&colors=filtro
        productQuery = productQuery.find({
            colors: {$regex: req.query.colors, $options: "i"}
        })
    }

    if(req.query.size){
        //filtra de acordo com o parametro - products?name=filtro&size=filtro
        productQuery = productQuery.find({
            size: {$regex: req.query.size, $options: "i"}
        })
    }

    //filtro por preços
    if(req.query.price){
        
        //separa em array atraves do split
        const priceRange = req.query.price.split('-')

        //usar gte e lte para filtrar
        productQuery = productQuery.find({
            price: {$gte: priceRange[0], $lte: priceRange[1]}
        })
    }

    //paginação

    //se vier a pagina do usuario
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1

    //se vier o limite de resultados
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10

    //startIdx
    const startIdx = (page - 1) * 10;

    //endIdx
    const endIdx = page * limit;

    //retornar a query
    const total = await Product.countDocuments()

    //limitar a query
    productQuery = productQuery.skip(startIdx).limit(limit)

    //resultado da paginação
    const pagination = {}
    
    if(endIdx < total){

        pagination.next = {
            page: page + 1,
            limit: 1
        }
    }

    if(startIdx > 0){
        pagination.prev = {
            page: page - 1,
            limit,
        }
    }

    //retorna a busca
    const products = await productQuery

    res.json({
        status: 'success',
        total,
        results: products.length,
        pagination,
        message: "Products fetched successfully",
        products
    })
})

//@desc Get single products
//@route GET /api/products/:id
//@access Public

export const getProductCtrl = expressAsyncHandler(async (req, res)=>{

    const product = await Product.findById(req.params.id)

    if(!product){
        throw new Error('Product not found')
    }

    res.json({
        status: "success",
        message: "Product fetched successfully",
        product
    })
})

//@desc Update products
//@route PUT /api/products/:id/update
//@access Private/Admin

export const updateProductCtrl = expressAsyncHandler(async (req, res)=>{

    const { name, description, category, sizes, colors, user, price, totalQty, brand } = req.body

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name, 
        description, 
        category, 
        sizes, 
        colors, 
        user, 
        price, 
        totalQty, 
        brand
    },
    {
        new: true
    })

    res.json({
        status: "success",
        message: "Product updated succesfully",
        product
    })

})