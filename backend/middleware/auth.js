const dotenv= require('dotenv')
dotenv.config()
const jwt=require('jsonwebtoken')


function auth(req,res,next){
     
    const token=req.header('x-auth-token')
    
    if (!token) {
       return res.status(401).send('Access Denied.No Token Provided')  
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded.user
        next()
    } catch (err) {
        return res.status(400).send('Invalid Token')
    }
}

module.exports=auth