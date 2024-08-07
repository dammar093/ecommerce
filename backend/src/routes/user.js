const express = require("express");
const { signUp, login,updateProfile, logout, getCurrentUser, updateAvatar, getAllUsers, deleteUser } = require("../controllers/user");
const upload = require("../service/multer");
const {verifyJwtToken, adminAuth}  = require("../service/auth");

const router = express.Router();

router.post("/signup",upload.single("avatar"),signUp);
router.post("/login",login);
router.get("/getUser",verifyJwtToken,getCurrentUser)
router.patch("/profile",verifyJwtToken,updateProfile)
router.patch("/update-avatar",verifyJwtToken,upload.single("avatar"),updateAvatar)
router.get("/:page",verifyJwtToken,adminAuth,getAllUsers)
router.delete("/:id",verifyJwtToken,adminAuth,deleteUser)
router.post("/logout",logout)
module.exports = router;
