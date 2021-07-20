const express = require("express");
const router = express.Router();
const Product = require('../../models/Product')
const Category = require('../../models/Category')
const Subcategory = require('../../models/Subcategory')
const Brand = require('../../models/Brand')
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)


router.get('/getAllProducts',async(req,res)=>{

    let sort= req.query.sort ? req.query.sort : '_id'
    let order= req.query.order ? req.query.order : 'asc'
    let limit= req.query.limit ? parseInt( req.query.limit) : null
    
    const products= await Product.find()
                                    // .select('name price category')
                                 .populate('category',['name'])
                                 .populate('subcategory',['name'])
                                 .populate('brand',['name'])
                                 .sort([[sort,order]])
                                 .limit(limit)
    res.send(products)

})

router.get('/getProductsByCategory/:id',async(req,res)=>{

    let sort= req.query.sort ? req.query.sort : '_id'
    let order= req.query.order ? req.query.order : 'asc'
    let limit= req.query.limit ? parseInt( req.query.limit) : null
    
    const products= await Product.find({category:req.params.id})
                                // .select('name price category')
                                 .populate('category',['name'])
                                 .populate('subcategory',['name'])
                                 .populate('brand',['name'])
                                 .sort([[sort,order]])
                                 .limit(limit)
    res.send(products)

})

router.get('/getProductsBySubcategory/:id',async(req,res)=>{

    let sort= req.query.sort ? req.query.sort : '_id'
    let order= req.query.order ? req.query.order : 'asc'
    let limit= req.query.limit ? parseInt( req.query.limit) : null
    
    const products= await Product.find({subcategory:req.params.id})
                                //  .select('name price category subcategory')
                                 .populate('category',['name'])
                                 .populate('subcategory',['name'])
                                 .populate('brand',['name'])
                                 .sort([[sort,order]])
                                 .limit(limit)
    res.send(products)

})

router.get('/getProductsBySearch',async(req,res)=>{

    let sort= req.query.sort ? req.query.sort : '_id'
    let order= req.query.order ? req.query.order : 'asc'
    let limit= req.query.limit ? parseInt( req.query.limit) : null
    let query=req.query.search 

    if (query) {
        const products= await Product.find({ "name": { "$regex": query, "$options": "i" }})
                                //  .select('name price category subcategory')
                                 .populate('category',['name'])
                                 .populate('subcategory',['name'])
                                 .populate('brand',['name'])
                                 .sort([[sort,order]])
                                 .limit(limit)
        res.send(products)
    }              

})


router.get('/products/:id', async(req,res)=>{
     
    const product = await Product.findById(req.params.id)
                                .populate('category',['name'])
                                .populate('subcategory',['name'])
                                .populate('brand',['name'])
    if (!product) {
        return res.status(400).send('Product not found')
    }

    res.send(product)



})







module.exports = router