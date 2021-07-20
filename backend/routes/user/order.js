const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const user = require("../../middleware/user");
const Order = require("../../models/Order");
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)

//Routes

router.post("/orders", [auth, user], async(req, res) => {
    // const {orderItems,shippingAddress,paymentMethod,taxPrice,shippingPrice,totalPrice}=req.body
    // if (orderItems & orderItems.length === 0) {
    //     res.status(400).send('No order Items')
    // }else{
    //     let order=new Order({
    //         user:req.user._id,
    //         orderItems:orderItems,
    //         shippingAddress:shippingAddress,
    //         paymentMethod:paymentMethod,
    //         taxPrice:taxPrice,
    //         shippingPrice:shippingPrice,
    //         totalPrice:totalPrice
    //     })
    // }

    // try {
    //     order=await order.save()
    //     res.send(order)
    // } catch (ex) {
    //     for (const key in ex.errors) {
    //         res.status(404).send(ex.errors[key].message)
    //     }
    // }

    const schema=Joi.object({
        
        product:Joi.array().items(Joi.objectId()).required(),
        quantity:Joi.array().items(Joi.number()).required(),
        price:Joi.array().items(Joi.number()).required(),
        address:Joi.string().required(),
        city:Joi.string().required(),
        postalCode:Joi.string().required(),
        country:Joi.string().required(),
        paymentMethod:Joi.string().required(),
        taxPrice:Joi.number().required(),
        shippingPrice:Joi.number().required(),
        totalPrice:Joi.number().required(),
    
    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details)
    }

    const { product,quantity,price,address,city,postalCode,country,paymentMethod,taxPrice,shippingPrice,totalPrice} = req.body

    shippingAddress={}
    shippingAddress['address']=address
    shippingAddress['city']=city
    shippingAddress['postalCode']=postalCode
    shippingAddress['country']=country

    let order=new Order({
        user:req.user.id,
        shippingAddress:shippingAddress,
        paymentMethod:paymentMethod,
        taxPrice:taxPrice,
        shippingPrice:shippingPrice,
        totalPrice:totalPrice
    })

    for (let i = 0; i< product.length; i++) {
          
        orderItem={}
        orderItem['product']=product[i]
        orderItem['qty']=quantity[i]
        orderItem['price']=price[i]

        order.orderItems.push(orderItem)
    }

    try {
        order=await order.save()
        res.send(order)
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message)
        }
    }

});

router.get("/orders", [auth, user], async(req, res) => {
    
    const orders=await Order.find({user:req.user.id})
                       .populate('user' ,'name email')
                       .populate('orderItems.product','name thumbnailImage')
    return res.send(orders)
});


router.get("/orders/:id", [auth, user], async(req, res) => {
    
     const order=await Order.findById(req.params.id)
                        .populate('user' ,'name email')
                        .populate('orderItems.product','name thumbnailImage')
     if (order) {
         return res.send(order)
     } else {
         return res.status(404).send('Order not Found')
     }
});

router.put("/orders/payment/:id", [auth, user], async(req, res) => {
    
     let order=await Order.findById(req.params.id)
                        
     if (order) {
        order.isPaid=true,
        order.paidAt=Date.now()

        order=await order.save()
        res.send(order)
     } else {
         return res.status(404).send('Order not Found')
     }
});

//export

module.exports = router;

