const generateJwtToken = require("../utils/gnerateAcesstoken");
const uploadOnCloudinary  = require("../service/cloudinary");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const Category = require("../models/category");
const {v2} = require("cloudinary")


// add category
const addCategory = asyncHandler(async(req,res)=>{
  const {title} = req.body;
  const file = req.file;
  if(title.trim() === ""){
    throw new ApiError(400,"Title is required!");
  }
  const existCategory = await Category.findOne({title:title})
  
  if(existCategory){
    throw new ApiError(400,"Category already exist")
  }
  const localImagePath = file?.path
  if(!localImagePath){
    throw new ApiError(400,"Category image is required!")
  }
  const avatar = await uploadOnCloudinary(localImagePath);
  if(!avatar){
    throw new ApiError(400,"Category image is required!")
  }
  const category = await Category.create(
    {
      title:title.toLowerCase(),
      image:avatar.secure_url,
      imageId:avatar.public_id
    }
  )
  return res.status(201).json(
    new ApiResponse(201,category,"Category inserted successfuly")
  )
})

// get all category
const getAllCategory = asyncHandler(async(req,res)=>{
  const categories = await Category.find()

  return res.status(200).json( new ApiResponse(200,categories,"Fetched all categories"))
})

//delete category 
const deleteCategory = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  console.log(id);
  const category =await  Category.findById({_id:id})

  // console.log(category);
  if(!category){
    throw new ApiError(400,"The id is not exist!");
  }
  if(category){
   const  deletedCategory =await Category.findByIdAndDelete(category._id);
    await v2.uploader.destroy(category.imageId);  
    return res.status(200).json(new ApiResponse(200,deletedCategory,"category deleted successfuly"))
  }
    return res.status(400).json(new ApiResponse(400,{},"Deleted failed"))

})
// controller for pagination category
const getCategoriesByPage = asyncHandler(async(req,res)=>{
  // console.log(req.params.page);
  let page = 1
  if(req.params.page){
    page = Number(req.params.page)
  }
  const total = await Category.countDocuments();
  const pageSize =7;
  let skipValue = (page -1) * pageSize
  // console.log(skipValue);
  
  // console.log(total)
     const paginateCategories = await Category.find()
    .skip(skipValue)
    .limit(pageSize);

  // console.log(paginateCategories);

  return res.status(200).json( new ApiResponse(200,{data:paginateCategories,total:total},"Fetched all categories"));
})
module.exports ={
  addCategory,
  getAllCategory,
  deleteCategory,
  getCategoriesByPage
}