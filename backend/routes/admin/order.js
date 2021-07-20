const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Order = require("../../models/Order");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

//Routes

router.get("/orders", [auth, admin], async(req, res) => {
    const orders = await Order.find()
        .populate("user", "id name email")
        .populate("orderItems.product", "name thumbnailImage");
    return res.send(orders);
});

router.get("/orders/:id", [auth, admin], async(req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("user", "id name email")
        .populate("orderItems.product", "name thumbnailImage");
    if (order) {
        return res.send(order);
    } else {
        return res.status(404).send("Order not Found");
    }
});

router.put("/orders/delivary/:id", [auth, admin], async(req, res) => {
    let order = await Order.findById(req.params.id);

    if (order) {
        (order.isDelivered = true), (order.deliveredAt = Date.now());

        order = await order.save();
        res.send(order);
    } else {
        return res.status(404).send("Order not Found");
    }
});

//export

module.exports = router;