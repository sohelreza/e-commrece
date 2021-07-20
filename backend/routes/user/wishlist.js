const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const user = require("../../middleware/user");
const User = require("../../models/User");
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)

//Routes

router.post("/wishlist", [auth, user], async(req, res) => {
       
    const {productId}=req.body
    
    const user=await User.findOneAndUpdate(
                                           {_id:req.user.id},
                                           {$addToSet:{wishlist:productId}},
                                           {new:true}
                                           )

    res.send(user)

});

router.get("/wishlist", [auth, user], async(req, res) => {
    
    const wishlist=await User.findById(req.user.id).select('wishlist').populate('wishlist')
    res.send(wishlist)
    
});


router.put("/wishlist/:productId", [auth, user], async(req, res) => {
    
    const {productId}=req.params

    const user=await User.findOneAndUpdate(
        {_id:req.user.id},
        {$pull:{wishlist:productId}},
        {new:true}
        )
    
        res.send(user)
});

//export

module.exports = router;

