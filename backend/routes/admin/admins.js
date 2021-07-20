const User = require("../../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

//Routes

router.get("/admins", [auth, admin], async(req, res) => {
    const admins = await User.find({ userRole: 1 }).select("-password");
    res.send(admins);
});

router.get("/admins/:id", [auth, admin], async(req, res) => {
    const admin = await User.findById(req.params.id).select("-password");
    if (!admin) {
        res.status(400).send("Admin does not exists");
    }
    res.send(admin);
});

router.delete("/admins/:id", [auth, admin], async(req, res) => {
    const admin = await User.findByIdAndRemove(req.params.id);
    if (!admin) {
        res.status(400).send("Admin does not exists");
    }
    res.send(admin);
});

//export

module.exports = router;