const express = require("express");
const { verifyJwtToken, adminAuth } = require("../service/auth");
const { createOrder, verifyEsewa, getOrderByUserId, getAllOrders, getOrderById, updateOrderStatus } = require("../controllers/order");
const router = express.Router();

router
  .post("/", verifyJwtToken, createOrder)
  .get("/esewa", verifyEsewa)
  .get("/user-order", verifyJwtToken, getOrderByUserId)
  .get("/", verifyJwtToken, adminAuth, getAllOrders)
  .get("/:id", verifyJwtToken, adminAuth, getOrderById)
  .patch("/", verifyJwtToken, adminAuth, updateOrderStatus)
module.exports = router;
