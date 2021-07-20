const mongoose=require('mongoose')

const SubcategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        max:255
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    },
    image:{
        type:String,
        required:true
    }

},{
    timestamps:true
})


const Subcategory= mongoose.model('Subcategory',SubcategorySchema)

module.exports=Subcategory
