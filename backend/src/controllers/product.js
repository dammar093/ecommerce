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
    throw new ApiError(500,"something went wrong")
    return res.status(500).json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
});

const getAllProducts = asyncHandler(async(req,res)=>{
  try {
      const products = await Product.find();

      return res.status(200)
      .json(new ApiResponse(200,products,"product fetched successfuly"))
  } catch (error) {
      return res.status(500).json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
})

module.exports = {
  addProduct,
  getAllProducts
};
