const express = require("express");
const {verifyJwtToken} = require("../service/auth");
const { getAllProducts, addReview } = require("../controllers/review");

const router = express.Router()

router
.get("/",getAllProducts)
.post("/",verifyJwtToken,addReview)



module.exports = router