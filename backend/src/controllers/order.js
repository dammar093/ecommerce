const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/order");
const Cart = require("../models/cart");

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
      products:products,
      totalAmount:totalAmount,
      user:id,
      contact:contact,
      address:address
    })
    const cart = await Cart.deleteMany({addedBy:id});
    return res.status(200).json(new ApiResponse(200,order,"Order place successfuly"))
  } catch (error) {
    
  }
})



module.exports = {createOrder}