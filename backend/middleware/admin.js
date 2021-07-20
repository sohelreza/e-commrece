const config=require('config')
const jwt=require('jsonwebtoken')


function admin(req,res,next){
     
    if (req.user.userRole !==1 ) {
        return res.status(403).send('Admin Access Denied')
    }

    next()

}

module.exports=admin