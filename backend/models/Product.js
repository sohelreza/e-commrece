const { boolean } = require('joi')
const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        
    },
    // name:{
    //     type:String,
    //     required:true,
    // },
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const ProductSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true,
        // text: true
        
    },
    description:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    },
    subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Subcategory'
    },
    unit:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    offer:{
        hasOffer:{
            type:Boolean
        },
        discountPercentage:{
            type:Number
        },
        discountPrice:{
            type:Number
        },
    },
    thumbnailImage:{
        type:String,
        required:true
    },
    multipleImage:[
        {
            image:{
                type:String,
                // required:true
            }
        }
    ]
    

},{
    timestamps:true
})





const Product= mongoose.model('Product',ProductSchema)

module.exports=Product
