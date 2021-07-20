const mongoose=require('mongoose')

const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        max:255
    },
    image:{
        type:String,
        required:true
    }

},{
    timestamps:true
})


const Category= mongoose.model('Category',CategorySchema)

module.exports=Category
