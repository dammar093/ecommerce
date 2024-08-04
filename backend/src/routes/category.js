const express = require("express");
const { adminAuth, verifyJwtToken } = require("../service/auth");
const upload = require("../service/multer");
const { addCategory, getAllCategory, deleteCategory, getCategoriesByPage } = require("../controllers/category");

const router = express.Router();

router.post("/add-category",verifyJwtToken,adminAuth,upload.single("image"),addCategory)
router.get("/",getAllCategory)
router.delete("/delete-category/:id",verifyJwtToken,adminAuth,deleteCategory)
router.get("/getcategories/:page",getCategoriesByPage)

module.exports = router