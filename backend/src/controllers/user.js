const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const User = require("../models/user");
const uploadOnCloudinary  = require("../service/cloudinary");
const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require("bcrypt");
const generateJwtToken = require("../utils/gnerateAcesstoken");
const {v2} = require('cloudinary');
const signUp =asyncHandler(async(req,res)=>{
  
    // step 1: get all fields
    // step 2: validate fields
    // step 3: check user aleardy exist
    // step 4: check avatar Image
    // step 5: upload avar on cloudinary
    // step 6
    // step 7: create user boject and and save on users Collection
    // step 8: remove password
    // step 9: check user createConnection
    // step 10: res created user

    const {fullName, email,username,password, role} = req.body;
    if( [fullName, email, username, password].some((field) => field?.trim() === "")){
      throw new ApiError(400, "All fields are required")
    };
    const existedUser = await User.findOne({
      $or: [{ username }, { email }]
    });
    if(existedUser){
      throw new ApiError(409,"user already exist");
    };
    

    let avatarLocalPath=req?.file?.path;
    // console.log(avatarLocalPath);
    
    if(!avatarLocalPath){
      throw new ApiError(500,"Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar){
      throw new ApiError(500,"Avatar is required")
    }
    let hashedPassword = bcrypt.hashSync(password,10);
    // console.log(hashedPassword);

    const user = await User.create({
        fullName,
        avatar:avatar.secure_url,
        avatarId:avatar.public_id,
        email, 
        password :hashedPassword,
        role:role || "user",
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password"
    );
    
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
  const token = generateJwtToken(user._id);
  const options={
    httpOnly:true,
    secure:true
  }
    return res.status(200)
    .cookie("accessToken",token,options)
    .json(
        new ApiResponse(200, {token}, "User loggedin Successfully")
    )
});


const login = asyncHandler(async(req,res)=>{
  // console.log(req.body);
  const {email,password,username} = req.body;
  if( [ email, password,username].some((field) => field?.trim() === "")){
      throw new ApiError(400, "All fields are required")
    };

    const user = await User.findOne({
        $or: [{username}, {email}]
    })
  
    if(!user){
      throw new ApiError(401, "Invalid email or password!" )
    }
    
  const validUser =  bcrypt.compareSync(password,user.password)
  if(!validUser){
    throw new ApiError(401, "Invalid emial or password!")
  }
  const loggedInUser = await User.findById(user._id).select("-password");
  // console.log(loggedInUser);
  const token = generateJwtToken(user._id);
  const options={
    httpOnly:true,
    secure: true,
  }
    return res.status(200)
    .cookie("accessToken",token,options)
    .json(
        new ApiResponse(200, {loggedInUser,token}, "User loggedin Successfully")
    )
});

//get current user
const getCurrentUser=asyncHandler(async(req,res)=>{

  // console.log(req.user);
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      req.user,
      "User fetched successfully"
    ))
})

// edit profile details controller
const updateProfile = asyncHandler(async(req,res)=>{
  const {fullName, email,username,_id} = req.body
  // console.log(req.body);
    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

        const user = await User.findByIdAndUpdate(
        _id,
        {
            $set: {
                fullName,
                email,
                username
            }
        },
        {new: true}
        
    ).select("-password")
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})

// controller for update avatar
const updateAvatar = asyncHandler(async(req,res)=>{
    // console.log("user:: ",req.user);
    // console.log("body:: ",req.body.avatarId);
    // console.log("file:: ",req?.file);
    const {_id} = req.user
    const avatarLocalPath = req?.file?.path;
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    await v2.uploader.destroy(req.user.avatarId);
    const user = await User.findByIdAndUpdate(
        _id,
        {
            $set: {
                avatar:avatar.secure_url,
                avatarId:avatar.public_id
            }
        },
        {new: true}
        
    ).select("-password")
  return res.status(200).json( new ApiResponse(200,user,"Avartar updated successfuly"))
})

// controller for get all user
const getAllUsers = asyncHandler(async(req,res)=>{
  let page = 1;
  if(req.params.page){
    page = Number(req.params.page)
  }
  const pageSize = 7;
  const skipValue = (page - 1) * pageSize;
  const total = await User.countDocuments();
  // console.log(total);

  const users = await User.find().skip(skipValue).limit(7);
  // console.log(users);

  return res.status(200).json(new ApiResponse(200,{data:users,total:total},"Users fetched successfuly"));
})

//controller for delete user
const deleteUser = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  // console.log(id);
  const user =await  User.findById({_id:id})

  // console.log(user);
  if(!user){
    throw new ApiError(400,"The id is not exist!");
  }
  if(user){
    const deletedUser = await User.findByIdAndDelete(user._id);
    await v2.uploader.destroy(user.avatarId);  
    return res.status(200).json(new ApiResponse(200,deleteUser,"user deleted successfuly"))
  }
    return res.status(400).json(new ApiResponse(400,{},"Deleted failed"))

})

//log out controller for user
const logout = asyncHandler(async(req,res)=>{
  // console.log("cookie",req.cookies);
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

module.exports ={signUp,login,getCurrentUser,logout,updateProfile,updateAvatar,getAllUsers,deleteUser}