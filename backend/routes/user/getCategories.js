const express = require("express");
const router = express.Router();
const Product = require('../../models/Product')
const Category = require('../../models/Category')
const Subcategory = require('../../models/Subcategory')
const Brand = require('../../models/Brand')
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)


router.get('/categoriesPopular',async(req,res)=>{

    const categories= await Category.find().limit(10)
    res.send(categories)

})

router.get('/categories',async(req,res)=>{

    const categories= await Category.find()
    res.send(categories)

})




module.exports = router