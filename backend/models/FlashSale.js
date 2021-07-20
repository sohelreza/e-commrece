const { boolean } = require('joi')
const mongoose=require('mongoose')

const FlashSaleSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    flashItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            },
            discountPercentage:{
                type:Number,
                required:true
            },
            discountPrice:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    

},{
    timestamps:true
})





const FlashSale= mongoose.model('FlashSale',FlashSaleSchema)

module.exports=FlashSale
