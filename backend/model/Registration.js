const mongoose=require('mongoose')
const RegisterSchema=new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
    },
    Mobile:{
        type:Number,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    },
    ConfirmPassword:{
        type:String,
        required:true,
    },
    ProfilePicture:{
        type:String,
        required:false
    },
    active:{ 
        //This will ensure that any new user is created will be active without sending an API request to access 
        type:Boolean,
        default:true 
    }
},
    {timestamps:true}
)

module.exports=mongoose.model("Registration",RegisterSchema)