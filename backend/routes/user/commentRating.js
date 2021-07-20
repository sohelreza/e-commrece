const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const user = require("../../middleware/user");
const Product = require("../../models/Product");
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)

//Routes



router.post("/products/:id/review", [auth, user], async(req, res) => {
    
    const {rating,comment}=req.body
     let product=await Product.findById(req.params.id)
                        
     if (product) {
        const alreadyReviewed=product.reviews.find(r=>r.user.toString() === req.user.id.toString())
        if (alreadyReviewed) {
            return res.status(400).send('Product Already Reviewed')
        }
        const review={
            // name:req.user.name, 
            rating:Number(rating),
            comment:comment,
            user:req.user.id
        }
        product.reviews.push(review)

        product.numReviews=product.reviews.length
        product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length

        await product.save()

        return res.send('Review Added')
     } else {
         return res.status(404).send('Product not Found')
     }
});

//export

module.exports = router;

