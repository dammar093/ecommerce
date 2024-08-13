const  asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const  Cart  = require("../models/cart");


const addToCart = asyncHandler(async(req,res)=>{
// console.log(req.body._id);

  
  try {
    let exitProduct = await Cart.findOne({ 'product._id': req.body?._id });
    // console.log(exitProduct);

    if(exitProduct){
      exitProduct.product.quantity += 1;
      const updatedProduct = await exitProduct.save();
      return res.status(200).json(new ApiResponse(200, updatedProduct, "Cart updated successfully"));
    }else{
      const cart = await Cart.create({
      product:req.body,
      addedBy:req.user._id
    })
    return res.status(200).json( new ApiResponse(200,cart,"cart added successfuly"))
    }
  } catch (error) {
    throw new ApiError(500,"server error")
  }
  
})

const getAllCart = asyncHandler(async(req,res)=>{
  try {
    const cart = await Cart.find({addedBy:req.user._id})
    // console.log(cart);
    
    if(!cart){
      return res.status(404).json( new ApiResponse(404,{},"Empty cart"))
    }
    return res.status(200).json(new ApiResponse(200,cart,"fetched carts successfuly"))
  } catch (error) {
    throw new ApiError(500,"failed to get cart")
  }
})

const updateCart = asyncHandler(async(req,res)=>{
  const {id} = req.params
  const {flag} =req.body

  try {
    const cartItem = await Cart.findById({_id:id}) 
    let updatedcart
    switch(flag){
    case "increment":
        updatedcart = await Cart.findByIdAndUpdate({_id:id},{
        $set:{
          'product.quantity': cartItem?.product.quantity + 1
        }
      },{new:true})
      break;
      case "decrement":
            updatedcart = await Cart.findByIdAndUpdate({_id:id},{
        $set:{
          'product.quantity': cartItem.product >1 ? cartItem?.product.quantity - 1 : cartItem.product
        }
      },{new:true})
      break;
      case "value":
        updatedcart = await Cart.findByIdAndUpdate({_id:id},{
        $set:{
          'product.quantity': Number(req.body.value)
        }
      },{new:true})
      return res.status(200).json(new ApiResponse( 200,
        { 
            id:updatedcart?.product._id,
            quantity:updatedcart?.product?.quantity
        }
      ))
      default :
      throw new ApiError(500,"something went wrong")
    }
    if(!updatedcart){
      throw new ApiError(404,"cart product is not found")
    }
    return res.status(200).json(new ApiResponse(200,
      {
        id:updatedcart?.product._id,
      },
        "cart updated successfuly"
      ))
    
  } catch (error) {
      throw new ApiError(500,"cart product is not found")
  }
})


const deleteCart = asyncHandler(async(req,res)=>{
  const {id} = req.params
  try {
    const deletedcart = await Cart.findByIdAndDelete({_id:id});
    return res.status(200).json( new ApiResponse(200,{id:deletedcart._id},"Cart delete successfuly"))
  } catch (error) {
    
  }
})
module.exports ={
  addToCart,
  getAllCart,
  updateCart,
  deleteCart
}