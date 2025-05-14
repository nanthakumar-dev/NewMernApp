const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true,
        maxLength:[100,"Prodect Name Can't Exceed 100 Character"]
    },
    price:{
        type:Number,
        default:0.0
    },
    description:{
        type:String,
        
    },
    rating:{
        type:String,
        default:0
    },
    images:[
        {
            image:{
                type:String,
                required:true
            }
        }
    ],
    user:mongoose.Schema.Types.ObjectId,
    category:{
        type:String,
        required:true,
        enum:{
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message:'Please Enter Valid Category'
        }
    },
    seller:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        maxLength:[100,"Stock Can't Exceed 30 "]
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            },
            rating:{
                type:String
            },
            comment:{
                type:String
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const productModel=mongoose.model('product',productSchema);

module.exports=productModel