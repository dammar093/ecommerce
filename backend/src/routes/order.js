const express = require("express");
const {verifyJwtToken} = require("../service/auth");
const {createOrder, verifyEsewa, getOrderById} = require("../controllers/order");
const router = express.Router();

router
.post("/",verifyJwtToken,createOrder)
.get("/esewa",verifyEsewa)
.get("/user-order",verifyJwtToken,getOrderById)

module.exports=router;
