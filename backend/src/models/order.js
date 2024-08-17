const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
  {
    orders:{
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
    paymentStatus:{
      type:String,
      default:"pending"
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    paymentMethod:{
      type: String,
      enum: ['esewa'],
      default:"esewa"
    },
    orderStatus:{
      type:String,
      default:"pending"
    }
  },
  {
    timestamps:true
  }
)

const Order = mongoose.model("Order",orderSchema)
module.exports = Order