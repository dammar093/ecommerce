const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    product:{
      type:Object,
      require:true
    },
    addedBy:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
    }
  },
  {
    timestamps:true
  }
)

const Cart = mongoose.model("Cart",cartSchema);

module.exports=Cart