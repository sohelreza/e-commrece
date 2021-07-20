const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
const FlashSale = require('../../models/FlashSale')
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)


router.get('/flashsales',[auth,admin],async(req,res)=>{

    const flashsales= await FlashSale.find().populate('flashItems.product')
    res.send(flashsales)

})

router.get('/flashsales/:id',[auth,admin], async(req,res)=>{
     
        const flashsale = await FlashSale.findById(req.params.id).populate('flashItems.product')
        if (!flashsale) {
            return res.status(400).send('Flashsale not found')
        }

        res.send(flashsale)

})


router.post('/flashsales',[auth,admin],async(req,res)=>{
    // console.log(req.file)
    const schema=Joi.object({
        startDate:Joi.date().required(),
        endDate:Joi.date().required(),
        product:Joi.array().items(Joi.objectId()).required(),
        discount:Joi.array().items(Joi.number()).required(),
    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details)
    }

    const { startDate,endDate, product, discount } = req.body

    let flashSale = new FlashSale({
        startDate:startDate,
        endDate:endDate,
    }) 

    for (let i = 0; i< product.length; i++) {
          
        object={}
        object['product']=product[i]
        object['discount']=discount[i]

        flashSale.flashItems.push(object)
       

   }

    try {
        flashSale=await flashSale.save()
        res.send(flashSale)
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message)
        }
    }

    
})

router.put('/flashsales/:id',[auth,admin],async (req,res)=>{
    const schema=Joi.object({
        startDate:Joi.date().required(),
        endDate:Joi.date().required(),
        product:Joi.array().items(Joi.objectId()).required(),
        discount:Joi.array().items(Joi.number()).required(),

    })

    

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details)
    }

    const { startDate,endDate, product, discount } = req.body

    try {
        const flashSale = await FlashSale.findByIdAndUpdate(req.params.id,{
            startDate:startDate,
            endDate:endDate,
        },{new:true})

        flashSale.flashItems=[]
    
        for (let i = 0; i< product.length; i++) {
              
            object={}
            object['product']=product[i]
            object['discount']=discount[i]
    
            flashSale.flashItems.push(object)
        }
        await flashSale.save()
        res.send(flashSale)
    } catch (error) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message)
        }
    }

    res.send(flashSale)
})

// router.delete('/subcategories/:id',[auth,admin],async (req,res)=>{
    
//     const subcategory= await Subcategory.findByIdAndRemove(req.params.id)
//     if (!subcategory) {
//         return res.status(404).send('Subcategory not found ')
//     }

//     res.send(subcategory)

//  })
 




//export

module.exports = router