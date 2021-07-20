const dotenv = require("dotenv");
dotenv.config();
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

//Routes

router.post("/login", async(req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { email, password } = req.body;

    let admin = await User.findOne({ email: email, userRole: 1 });

    if (!admin) {
        return res.status(400).send("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
        return res.status(400).send("Invalid email or password");
    }

    const payload = {
        user: {
            id: admin.id,
            userRole: admin.userRole,
        },
    };
    jwt.sign(
        payload,
        process.env.JWT_SECRET, { expiresIn: "12h" },
        (err, token) => {
            if (err) {
                throw err;
            }
            res.send({ token });
        }
    );

    res.send(token);
});

//export

module.exports = router;