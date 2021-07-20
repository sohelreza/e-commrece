const User = require("../../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

//Routes

// to get all the users list in the admin panel
router.get("/users", [auth, admin], async(req, res) => {
    const users = await User.find({ userRole: 2 }).select("-password");

    res.send(users);
});

// to get a user details in the admin panel
router.get("/users/:id", [auth, admin], async(req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
        res.status(400).send("User does not exists");
    }

    res.send(user);
});

// to delete a user in the admin panel
router.delete("/users/:id", [auth, admin], async(req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) {
        res.status(400).send("User does not exists");
    }

    res.send(user);
});

//export

module.exports = router;