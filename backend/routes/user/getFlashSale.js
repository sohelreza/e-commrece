const express = require("express");
const router = express.Router();
const FlashSale = require("../../models/FlashSale");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

router.get("/getFlashSale", async(req, res) => {
    const flashSale = await FlashSale.find();
    res.send(flashSale);
});

module.exports = router;