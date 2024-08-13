const express = require("express");
const { addToCart, getAllCart, updateCart, deleteCart } = require("../controllers/cart");
const { verifyJwtToken } = require("../service/auth");

const router = express.Router();

router
.get("/",verifyJwtToken,getAllCart)
.post("/",verifyJwtToken,addToCart)
.patch("/:id",verifyJwtToken,updateCart)
.delete("/:id",verifyJwtToken,deleteCart)



module.exports= router