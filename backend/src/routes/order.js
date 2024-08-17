const express = require("express");
const {verifyJwtToken} = require("../service/auth");
const {createOrder, verifyEsewa} = require("../controllers/order");
const router = express.Router();

router
.post("/",verifyJwtToken,createOrder)
.get("/esewa",verifyEsewa)


module.exports=router;
