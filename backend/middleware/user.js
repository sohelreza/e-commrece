const config=require('config')
const jwt=require('jsonwebtoken')


function user(req,res,next){
     
    if (req.user.userRole !==2 ) {
        return res.status(403).send('User Access Denied')
    }

    next()

}

module.exports=user