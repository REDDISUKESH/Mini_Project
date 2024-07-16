const express=require('express')
const path=require('path')
const app=express()
const mongoose=require('mongoose')
const connectDB=require('./Config/dbConn')
const authroute=require('./routes/authroute')
const Cart=require('./routes/Cart')
const product=require('./routes/product')
const multer=require('multer')
const dotenv = require('dotenv');
const PORT=process.env.PORT || 3500;
app.use(express.json())
const dalleRoutes=require('./routes/dalle.routes')
const cors=require('cors')
app.use(cors())
connectDB();
const stroage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
})
const upload=multer({storage:stroage});
app.post("/upload",upload.single("file"),(req,res)=>{
    res.status(200).json({message:'file has been uploaded'})
})
app.use('/auth',authroute)
app.use('/product',product)
app.use('/cart',Cart)
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use('/api/v1/dalle',dalleRoutes)
app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello From Dalle"})
})
mongoose.connection.once('open',()=>{
    console.log('connected to mongodb')
    app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
})