const express = require("express");
const router = express.Router();
const Slider = require('../../models/Slider')
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)


router.get('/sliders',async(req,res)=>{

    const sliders= await Slider.find().sort({_id:1}).limit(3)
    res.send(sliders)

})

router.get('/tops',async(req,res)=>{

    const sliders= await Slider.find().sort({_id:-1}).limit(3)
    res.send(sliders)

})




module.exports = router