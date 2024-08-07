const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const uploadOnCloudinary = require("../service/cloudinary");
const Product = require("../models/product");

const addProduct = asyncHandler(async (req, res) => {
  const { title, price, brand, colors, sizes, description, quantity, category, discount } = req.body;
  const files = req.files;
 console.log(colors,sizes);

  if (!title) {
    throw new ApiError("Title is required!", 400);
  }
  if (!description) {
    throw new ApiError("Description is required!", 400);
  }
  if (!price) {
    throw new ApiError("Price is required!", 400);
  }
  if (!brand) {
    throw new ApiError("Brand is required!", 400);
  }
  if (!category) {
    throw new ApiError("Category is required!", 400);
  }
  if (!quantity) {
    throw new ApiError("Quantity is required!", 400);
  }
  if (!files || files.length === 0) {
    throw new ApiError("Images are required!", 400);
  }
 // Convert colors and sizes to arrays if they are strings
  const colorArray = typeof colors === 'string' ? colors.trim().split(',') : colors;
  const sizeArray = typeof sizes === 'string' ? sizes.trim().split(',') : sizes;
  try {
    let uploadedFile = [];
    let uploadFileId = [];

    for (let file of files) {
      let cloudinaryFile = await uploadOnCloudinary(file.path);
      uploadedFile.push(cloudinaryFile.secure_url);
      uploadFileId.push(cloudinaryFile.public_id);
    }

    const product = await Product.create({
      title,
      images: uploadedFile,
      imagesId: uploadFileId,
      brand,
      category,
      price: Number(price),
      discountPercentage: Number(discount),
      stock: Number(quantity),
      description,
      colors: colorArray.length >1 ?colorArray : [],
      sizes: sizeArray.length >1 ? sizeArray : []
    });

    return res.status(201).json(new ApiResponse(201, product, "Product added successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
});

const getAllProducts = asyncHandler(async(req,res)=>{
  try {
      const products = await Product.find();
      const total = await Product.countDocuments();
      return res.status(200)
      .json(new ApiResponse(200,{data:products,total},"product fetched successfuly"))
  } catch (error) {
      return res.status(500).json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
})

const getBestDealsProguct = asyncHandler(async(req,res)=>{
  try {
      const products = await Product.find().sort({discountPercentage:'desc'});

      return res.status(200)
      .json(new ApiResponse(200,products,"product fetched successfuly"))
  } catch (error) {
      return res.status(500).json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
})

const getHighRatedProduct = asyncHandler(async(req,res)=>{
  try {
      const products = await Product.find().sort({rating:'desc'});

      return res.status(200)
      .json(new ApiResponse(200,products,"product fetched successfuly"))
  } catch (error) {
      return res.status(500).json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
})
const getNewArrivalProducts = asyncHandler(async(req,res)=>{
  try {
      const products = await Product.find().sort({createdAt:'desc'});

      return res.status(200)
      .json(new ApiResponse(200,products,"product fetched successfuly"))
  } catch (error) {
      return res.status(500).json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
})

const deleteProducts = asyncHandler(async(req,res)=>{
  const {id} = req.params
  const deletedProduct = await Product.findByIdAndDelete({_id:id});
  if(!deleteProducts){
    throw new ApiError(500,"Failed to delete product")
  }
  return res.status(200)
  .json(new ApiResponse(200,{id:deleteProducts._id},"Deleted successfuly"))
})

module.exports = {
  addProduct,
  getAllProducts,
  getBestDealsProguct,
  getHighRatedProduct,
  getNewArrivalProducts,
  deleteProducts
};
