const express = require("express");
const router = express.Router();
const Product = require('../../models/Product')
const Category = require('../../models/Category')
const Subcategory = require('../../models/Subcategory')
const Brand = require('../../models/Brand')
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)


router.get('/subcategoriesPopular',async(req,res)=>{

    const subcategories= await Subcategory.find().limit(10)
    res.send(subcategories)

})

router.get('/subcategories',async(req,res)=>{

    const subcategories= await Subcategory.find()
    res.send(subcategories)

})




module.exports = router