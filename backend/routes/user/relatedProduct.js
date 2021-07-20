const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)

//Routes

router.get("/product/related/:productId", async(req, res) => {
    
    const product=await Product.findById(req.params.productId)

    const relatedproduct=await Product.find({
        _id:{$ne:product._id},
        category:product.category
    })
    .limit(4)
    .populate('category',['name'])
    .populate('subcategory',['name'])
    .populate('brand',['name'])
    res.send(relatedproduct)
    
});

//export

module.exports = router;

