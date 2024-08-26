const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const Order = require("../models/order");
const Cart = require("../models/cart");
const { createSignature } = require("../utils/eSewaSignture");
const { eSewaProductCode, eSewaUrl } = require("../config/config");

//create order
const createOrder = asyncHandler(async (req, res) => {
  const { totalAmount, products, id, contact, address } = req.body

  if (!contact.trim()) {
    throw new ApiError("Contact is required!")
  }
  if (!address.trim()) {
    throw new ApiError("Address is required!")
  }
  try {
    const order = await Order.create({
      orders: products,
      totalAmount: totalAmount,
      user: id,
      contact: contact,
      address: address
    })
    let signature = createSignature(totalAmount, order._id)
    // console.log("signature", signature);
    const cart = await Cart.deleteMany({ addedBy: id });
    return res.status(200).json(new ApiResponse(200, { ...order, signature: signature, url: eSewaUrl, code: eSewaProductCode }, "Order place successfuly"))
  } catch (error) {
    console.log(error);

  }
})

// verify esewa data
const verifyEsewa = asyncHandler(async (req, res) => {
  const { data } = req.query
  const decodedData = JSON.parse(atob(data))
  if (decodedData.status === "COMPLETE") {
    await Order.findByIdAndUpdate({ _id: decodedData.transaction_uuid },
      {
        $set: {
          paymentStatus: "paid"
        }
      }
    )
  }
  res.redirect("http://localhost:5173")
})

// get All orders by userId
const getOrderByUserId = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req?.user._id }).sort({ createdAt: -1 }).populate('user', 'fullName email').exec();
    // console.log(orders);

    return res.status(200).json(new ApiResponse(200, { data: orders, total: orders.length }, "Get order successfuly"))
  } catch (error) {
    throw new ApiError(500, "get order failed")
  }
})
// get All orders 
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const total = await Order.countDocuments()
    const orders = await Order.find({}).populate('user', 'fullName email').exec();
    // console.log(orders);

    return res.status(200).json(new ApiResponse(200, { data: orders, total }, "Get order successfuly"))
  } catch (error) {
    throw new ApiError(500, "get order failed")
  }
})
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById({ _id: id }).populate("user", "fullName email")
    return res.status(200).json(new ApiResponse(200, order, "successfully get order"))
  } catch (error) {
    throw new ApiError(500, "server error")
  }
})
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body
  console.log(req.body);

  try {
    const order = await Order.findByIdAndUpdate({ _id: id },
      {
        $set: {
          orderStatus: status
        }
      },
      {
        new: true
      }
    )
    return res.status(200).json(new ApiResponse(200, order, "successfully get order"))
  } catch (error) {
    throw new ApiError(500, "server errror")
  }

})

const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const deletedOrder = await Order.findByIdAndDelete({ _id: id })
    return res.status(200).json(new ApiResponse(200, deleteOrder, "delete order"))
  } catch (error) {
    throw new ApiError(500, "server errror")
  }
})
module.exports = { createOrder, verifyEsewa, getOrderByUserId, getAllOrders, getOrderById, updateOrderStatus, deleteOrder }