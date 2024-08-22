const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/order");
const Cart = require("../models/cart");
const { createSignature } = require("../utils/eSewaSignture");
const { eSewaProductCode, eSewaUrl } = require("../config/config");

//create order
const createOrder = asyncHandler(async(req,res)=>{
  const {totalAmount,products,id,contact,address} = req.body

  if(!contact.trim()){
    throw new ApiError("Contact is required!")
  }
  if(!address.trim()){
    throw new ApiError("Address is required!")
  }
  try {
    const order = await Order.create({
      orders:products,
      totalAmount:totalAmount,
      user:id,
      contact:contact,
      address:address
    })
    let signature = createSignature(totalAmount,order._id)
    console.log("signature",signature);
    const cart = await Cart.deleteMany({addedBy:id});
    return res.status(200).json(new ApiResponse(200,{...order,signature:signature,url:eSewaUrl,code:eSewaProductCode},"Order place successfuly"))
  } catch (error) {
    console.log(error);
    
  }
})

// verify esewa data
const verifyEsewa = asyncHandler(async(req,res)=>{
  const {data} = req.query
  const decodedData = JSON.parse(atob(data))
  if(decodedData.status === "COMPLETE"){
    await Order.findByIdAndUpdate({_id:decodedData.transaction_uuid},
      {
        $set:{
          paymentStatus:"paid"
        }
      }
    )
  }
  res.redirect("http://localhost:5173")
})

// get All orders
const getOrderById = asyncHandler(async(req,res)=>{
  
  try {
    const orders = await Order.find({user:req?.user._id}).populate('user').exec();
    console.log(orders);
    
    return res.status(200).json(new ApiResponse(200,orders,"Get order successfuly"))
  } catch (error) {
    throw new ApiError(500,"get order failed")
  }
  
})
module.exports = {createOrder,verifyEsewa,getOrderById}