const express = require("express");
const {verifyJwtToken,adminAuth} = require("../service/auth");
const { addProduct, getAllProducts, getBestDealsProguct, getHighRatedProduct, getNewArrivalProducts, deleteProducts, getProductByPage, getProductById, getRelatedProduct ,getFiltredPRoducts, getProductsBySearch, getProductBycategory} = require("../controllers/product");
const upload = require("../service/multer")
const router = express.Router();


router.post("/",verifyJwtToken,adminAuth,upload.array("images",5),addProduct)
.get("/",getAllProducts)
.get("/best-deal",getBestDealsProguct)
.get("/high-rated",getHighRatedProduct)
.get("/new-arrival",getNewArrivalProducts)
.get("/getproducts/:page",getProductByPage)
.delete("/:id",verifyJwtToken,adminAuth,deleteProducts)
.get("/get-product/:id",getProductById)
.get("/related-product/:category",getRelatedProduct)
.get("/:sort/:order/:page",getFiltredPRoducts)
.get("/search/:search/:sort/:order/:page",getProductsBySearch)
.get("/categories/:category/:sort/:order/:page",getProductBycategory)



module.exports=router;