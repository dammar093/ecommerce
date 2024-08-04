const { jwtSecret } = require("../config/config");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const verifyJwtToken = asyncHandler(async(req,res,next)=>{
  try {
    console.log(req.cookies.accessToken);
    
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    const decodedToken = jwt.verify(token,jwtSecret);
    // console.log("decoded token:: ",decodedToken);
    const user = await User.findById(decodedToken?.sub).select("-password");
    // console.log("user:: ",user);
      if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
      req.user = user;
      next();
  } catch (error) {
    throw new ApiError(401,"Invalid access token")
  }
})


const adminAuth = (req,res,next)=>{
  if(req.user.role !== 'admin'){
    throw new ApiError(403,`${req.user.role} not allowed in this route`)
  }
  next()
}


module.exports = {verifyJwtToken,adminAuth}