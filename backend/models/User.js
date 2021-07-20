const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        max:255
    },
    email:{
        type:String,
        required:true,
        trim:true,
        max:255,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userRole:{
        type:Number,
        required:true,               
    },
    userAddress:{
        address:{
            type:String,
        },
        city:{
            type:String,
        },
        postalCode:{
            type:String,
        },
        country:{
            type:String,
        },

    },
    wishlist:[
        {   
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        
        }
    ]

},{
    timestamps:true
})


const User= mongoose.model('User',UserSchema)

module.exports=User
