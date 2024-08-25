const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    review:{
      type:String,
      require:true
    },
    rating:{
      type:Number,
      default:0,
      require:true
    },
    product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
    }
  },
  {
    timestamps:true
  }
)

const Review = mongoose.model("Review",reviewSchema)
module.exports = Review