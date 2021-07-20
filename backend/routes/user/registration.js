const dotenv= require('dotenv')
dotenv.config()
const config = require('config')
const jwt = require('jsonwebtoken')
const User=require('../../models/User')
const bcrypt=require('bcrypt')
const Joi=require('joi')
const express = require("express");
const router = express.Router();

//Routes


router.post('/registration',async(req,res)=>{
    // Validation
    const schema=Joi.object({
        name:Joi.string().max(255).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required()

    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const {name,email,password}=req.body

    //Logic

    let user=await User.findOne({email:email,userRole:2})
    
    if (user) {
        return res.status(400).send('Email Already Exists')
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    user=new User({
        name:name,
        email:email,
        password:hashedPassword,
        userRole:2,
    })

    try {
        user = await user.save()
        const payload = {
            user: {
                id: user.id,
                userRole: user.userRole
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                throw err
            }
            res.send({ token })
        })

    } catch (ex) {
        for (const key in ex.errors) {
            return res.status(404).send(ex.errors[key].message)
        }
    }

    
})



//export

module.exports=router




