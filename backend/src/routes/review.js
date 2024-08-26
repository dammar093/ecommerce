const express = require("express");
const { verifyJwtToken } = require("../service/auth");
const { getAllProducts, addReview, countReview } = require("../controllers/review");

const router = express.Router()

router
  .get("/", getAllProducts)
  .post("/", verifyJwtToken, addReview)
  .get("/count", countReview)



module.exports = router