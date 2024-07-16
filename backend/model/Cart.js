const mongoose=require('mongoose')
const cartItemSchema = new mongoose.Schema({
    ProductId: {
      type: String,
      required: true,
    },
    ProductCategory:{
      type:String,
      required:true
  },
    ProductName: {
      type: String,
      required: true,
    },
    ProductImages: {
      type: String,
      required: true,
    },
    ProductPrice: {
      type: Number,
      required: true,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    ProductBrand: {
      type: String,
      required: true,
    },
});
const userCartSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    cartItems: [cartItemSchema],
  });
module.exports=mongoose.model('UserCart',userCartSchema)  
  