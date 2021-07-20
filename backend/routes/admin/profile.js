const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const User = require("../../models/User");

//Routes

router.get("/profile/me", [auth, admin], async(req, res) => {
    const user = await User.findById(req.user.id);
    res.send(user);
});

//export

module.exports = router;