const express = require("express");
const {verifyJwtToken,adminAuth} = require("../service/auth");
const { addProduct, getAllProducts } = require("../controllers/product");
const upload = require("../service/multer")
const router = express.Router();


router.post("/",verifyJwtToken,adminAuth,upload.array("images",5),addProduct).get("/",getAllProducts)

module.exports=router;