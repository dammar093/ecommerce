const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
  {
    products:{
      type:[Object],
      require:true
    },
    totalAmount:{
      type:Number,
      require:true
    },
    contact:{
      type:String,
      require:true
    },
    address:{
      type:String,
      require:true
    },
    status:{
      type:String,
      default:"pendings"
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  },
  {
    timestamps:true
  }
)

const Order = mongoose.model("Order",orderSchema)
module.exports = Order