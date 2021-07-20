const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const user = require("../../middleware/user");
const User = require("../../models/User");
const Joi=require('joi')
const bcrypt=require('bcrypt')


//Routes

router.get("/profile/me", [auth, user], async(req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
});

router.put("/profile", [auth, user], async(req, res) => {
     // Validation
     const schema=Joi.object({
        name:Joi.string().max(255).required(),
        email:Joi.string().email().required()
    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const {name,email}=req.body

    let user = await User.findById(req.user.id);

    if (user) {
        user.name=name || user.name
        user.email=email || user.email
        
        user=await user.save()

        res.send(user)

    } else {
        res.status(404).send('User not found')
    }

    
});


router.post("/address", [auth, user], async(req, res) => {
    // Validation
    const schema=Joi.object({
       address:Joi.string().max(255).required(),
       city:Joi.string().max(255).required(),
       postalCode:Joi.string().max(255).required(),
       country:Joi.string().max(255).required(),
   })

   const {error}=schema.validate(req.body)

   if (error) {
       return res.status(400).send(error.details[0].message)
   }

   const {address,city,postalCode,country}=req.body

   let user = await User.findById(req.user.id);

   if (user) {
       userAddress = {};
       userAddress["address"] = address,
       userAddress["city"] = city;
       userAddress["postalCode"] = postalCode;
       userAddress["country"] = country;

       user.userAddress=userAddress
       user=await user.save()

       res.send(user)

   } else {
       res.status(404).send('User not found')
   }

   
});



router.post("/changePassword", [auth, user], async (req, res) => {
    // Validation
    const schema = Joi.object({
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
        confirmPassword: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    //Logic

    let user = await User.findOne({  _id: req.user.id, userRole: 2 });

    if (user != null) {
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) {
            return res.status(404).send("Please Enter Correct Current Password");
        }

        if (newPassword != confirmPassword) {
            return res.status(400).send("New Password & Confirm Password Must Match");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;

        try {
            user = await user.save();
            res.send(user);
        } catch (ex) {
            for (const key in ex.errors) {
                return res.status(404).send(ex.errors[key].message);
            }
        }
    }
});





//export

module.exports = router;