const express = require("express");
const { verifyJwtToken, adminAuth } = require("../service/auth");
const { createOrder, verifyEsewa, getOrderByUserId, getAllOrders, getOrderById, updateOrderStatus, deleteOrder, orderDetails } = require("../controllers/order");
const router = express.Router();

router
  .get("/sell", orderDetails)
  .post("/", verifyJwtToken, createOrder)
  .get("/esewa", verifyEsewa)
  .get("/user-order", verifyJwtToken, getOrderByUserId)
  .get("/:page", verifyJwtToken, adminAuth, getAllOrders)
  .get("/:id", verifyJwtToken, adminAuth, getOrderById)
  .patch("/", verifyJwtToken, adminAuth, updateOrderStatus)
  .delete("/:id", verifyJwtToken, adminAuth, deleteOrder)
module.exports = router;
