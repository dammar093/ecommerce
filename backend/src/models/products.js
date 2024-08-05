const mongoose = require("mongoose")


const productSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      require:true
    },
    price:{
      type:Number,
      require:true
    },
    discountPercentage:{
      Number:true
    },
    description:{
      type:String,
      require:true
    },
    colors:{
      type:[String]
    },
    sizes:{
      type:[String]
    },
    brand:{
      type:String,
      require:true
    },
    stock:{
      type:Number,
      require:true
    },
    images:{
      type:[],
      require:true
    },
    imagesId:{
      type:String
    },
    rating:{
      type:Number,
      default:0
    }
  },
  {
  timestamps:true
  }
)

const Product = mongoose.model("product",productSchema);

module.exports = Product