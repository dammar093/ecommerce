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
  const { page } = req.params
  const pageSize = 12;
  let skipValue = (page - 1) * pageSize;
  try {
    const total = await Order.countDocuments()
    const orders = await Order.find({}).skip(skipValue).limit(12).populate('user', 'fullName email').exec();
    // console.log(orders);

    return res.status(200).json(new ApiResponse(200, { data: orders, total }, "Get order successfuly"))
  } catch (error) {
    throw new ApiError(500, "get order failed")
  }
})
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  try {
    const order = await Order.findById({ _id: id }).populate("user", "fullName email")
    // console.log(order);

    return res.status(200).json(new ApiResponse(200, order, "successfully get order"))
  } catch (error) {
    throw new ApiError(500, "server error")
  }
})
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body
  // console.log(req.body);

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
    return res.status(200).json(new ApiResponse(200, deletedOrder, "delete order"))
  } catch (error) {
    throw new ApiError(500, "server errror")
  }
})

const orderDetails = asyncHandler(async (req, res) => {
  try {
    const deliver = await Order.find({ orderStatus: "delivered" })
    const pending = await Order.find({ orderStatus: "pending" })
    const cancelled = await Order.find({ orderStatus: "cancelled" })
    const orders = await Order.find({ paymentStatus: "paid" })
    const totalIncome = orders.reduce((acc, order) => order.totalAmount + acc, 0)
    // console.log(totalIncome);
    return res.status(200).json(new ApiResponse(200, { totalSell: totalIncome, deliver: deliver.length, pending: pending.length, cancelled: cancelled.length }, "total sell"))
  } catch (error) {
    throw new ApiError(500, "server error")
  }
})


module.exports = { createOrder, verifyEsewa, getOrderByUserId, getAllOrders, getOrderById, updateOrderStatus, deleteOrder, orderDetails }