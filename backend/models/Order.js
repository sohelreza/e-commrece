const mongoose=require('mongoose')

const OrderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            },
            qty:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
        }
    ],
    shippingAddress:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },

    },
    paymentMethod:{
        // type:mongoose.Schema.Types.ObjectId,
        type:String,
        required:true,
        // ref:'PaymentType'
    },
    // paymentResult:{

    // },
    taxPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date,
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false
    },
    deliveredAt:{
        type:Date,
    },



},{
    timestamps:true
})


const Order= mongoose.model('Order',OrderSchema)

module.exports=Order
