const mongoose=require('mongoose')
const DATABASE_URL="mongodb://0.0.0.0:27017/Ecommerce"; 
const connectDB=async()=>{
    try{
        await mongoose.connect(/* process.env. */DATABASE_URL,{
           /*  useNewUrlParser:true,
            useUnifiedTopology:true, */
        })
    }catch(err)
    {
        console.log(err)
    }
}

module.exports=connectDB;