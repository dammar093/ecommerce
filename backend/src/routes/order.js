const express = require("express");
const {verifyJwtToken} = require("../service/auth");
const {createOrder} = require("../controllers/order");
const router = express.Router();

router
.post("/",verifyJwtToken,createOrder)


module.exports=router;
