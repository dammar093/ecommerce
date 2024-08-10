const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const uploadOnCloudinary = require("../service/cloudinary");
const Product = require("../models/product");
const {v2} =require("cloudinary")

const addProduct = asyncHandler(async (req, res) => {
  const { title, price, brand, colors, sizes, description, quantity, category, discount } = req.body;
  const files = req.files;
//  console.log(colors,sizes);

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
      price: Math.round(Number(price) - Number(price) * Number(discount)/100),
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
      return res.status(200)
      .json(new ApiResponse(200,products,"product fetched successfuly"))
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
  for(let id of deleteProducts.imagesId){
    await v2.uploader.destroy(id)
  }
  return res.status(200)
  .json(new ApiResponse(200,{id:deleteProducts._id},"Deleted successfuly"))
})

const getProductByPage = asyncHandler(async(req,res)=>{
  let page = 1
  if(req.params.page){
    page = Number(req.params.page)
  }
  const total = await Product.countDocuments();
  const pageSize =12;
  let skipValue = (page -1) * pageSize
  // console.log(skipValue);
  
  // console.log(total)
    const products = await Product.find()
    .skip(skipValue)
    .limit(pageSize);


  return res.status(200)
      .json(new ApiResponse(200,{data:products,total:total},"product fetched successfuly"))
})

const getProductById = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    // console.log(id);
    const product = await Product.findById({_id:id})
    if(!product){
      throw new ApiError(404, "Product no found");
    }
    return res.status(200)
    .json(new ApiResponse(200,product,"Product fetched successfuly"))
})

const getRelatedProduct = asyncHandler(async(req,res)=>{
  const {category} = req.params
  // console.log(category);
  
  const relatedProducts = await Product.find({category:{$eq:category}})
if(!relatedProducts){
  throw new ApiError(404,"Product not found")
}
return res.status(200).json(new ApiResponse(200,relatedProducts,"Related products fetched successfuly"))
})

const getFiltredPRoducts= asyncHandler(async(req,res)=>{

try {
  const {sort,order,page} = req.params
  const skipValue = 12;
  let total = await Product.countDocuments();
  let products= await Product.find({}).skip( (Number(page) -1) * skipValue).limit(skipValue);
  
  if(sort && order){
    const sortOrder = order === 'asc' ? 1 : -1;
   products= await Product.find({}).sort({[sort]:sortOrder}).skip((Number(page) -1) * skipValue).limit(skipValue);
  }
  return res.status(200).json(
    new ApiResponse(200,{data:products,total:total},"products Fetched sucessfuly")
  )
  
} catch (error) {
  throw new ApiError(500,"something went wrong")
}
})
// getSearched items
const getProductsBySearch = asyncHandler(async(req,res)=>{
  const {search,page,sort,order} = req.params;
  
  
  const produtcsCount =  await Product.find({
        $or: [
          { title: { $regex: search, $options: 'i' } }, 
          { description: { $regex: search, $options: 'i' } },   
          { category: { $regex: search, $options: 'i' } }, 
        ],
      }
    )
    let products = await Product.find({
        $or: [
          { title: { $regex: search, $options: 'i' } }, 
          { description: { $regex: search, $options: 'i' } },   
          { category: { $regex: search, $options: 'i' } }, 
        ],
      }
    ).skip((page-1)*12).limit(12)
  
  if(!products){
    throw new ApiError(400,"404 product not found")
  }
  if(sort && order){
  const sortOrder = order === "asc" ? 1: -1
  products = await Product.find({
        $or: [
          { title: { $regex: search, $options: 'i' } }, 
          { description: { $regex: search, $options: 'i' } },   
          { category: { $regex: search, $options: 'i' } }, 
        ],
      }
    ).sort({[sort]:sortOrder}).skip((Number(page) - 1) * 12).limit(12)
  }
return res.status(200)
.json(new ApiResponse(200,{data:products,total:produtcsCount.length},"fetched product successfuly"))
})

//get product by category
const  getProductBycategory = asyncHandler(async(req,res)=>{
  const {category,page,sort,order} = req.params;
  
  const produtcsCount =  await Product.find({category:category} )
  let products = await Product.find({category:category}  ).skip((page-1)*12).limit(12)
  
  if(!products){
    throw new ApiError(400,"404 product not found")
  }
  if(sort && order){
  const sortOrder = order === "asc" ? 1: -1
  products = await Product.find({category:category}).sort({[sort]:sortOrder}).skip((Number(page) - 1) * 12).limit(12)
  }
return res.status(200)
.json(new ApiResponse(200,{data:products,total:produtcsCount.length},"fetched product successfuly"))
})

module.exports = {
  addProduct,
  getAllProducts,
  getBestDealsProguct,
  getHighRatedProduct,
  getNewArrivalProducts,
  deleteProducts,
  getProductByPage,
  getProductById,
  getRelatedProduct,
  getAllProducts,
  getFiltredPRoducts,
  getProductsBySearch,
  getProductBycategory
};
