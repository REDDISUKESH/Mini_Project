const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({
    ProductCategory:{
        type:String,
        required:true
    },
    ProductName:{
        type:String,
        required:true
    },
    Productdesc:{
        type:String,
        required:true
    },
    ProductPrice:{
        type:String,
        required:true
    },
    ProductImages:{
        type: String,
        required:false
    }, 
    ProductBrand:{
        type:String,
        required:false
    },
    ProductType:{
        type:String,
        required:false
    },
    active:{ 
        //This will ensure that any new user is created will be active without sending an API request to access 
        type:Boolean,
        default:true 
    }
    
},{timestamps:true})
module.exports=mongoose.model("products",ProductSchema)