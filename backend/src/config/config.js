const dotenv = require("dotenv").config();

const constants ={
  port:process.env.PORT || 8000,
  databaseName:"hamro-mart",
  CORS_ORIGIN:process.env.CORS_ORIGIN,
  dbUrl:process.env.MONGO_URL,
  cloudinaryCloudName : process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey : process.env.CLOUDINARY_API_KEY,
  coudinaryApiSecretKey : process.env.CLOUDINARY_API_SECRET,
  jwtSecret:process.env.JWT_SECRET,
  eSewaUrl:process.env.ESEWA_URL,
  eSewaProductCode:process.env.ESEWA_PRODUCT_CODE,
  eSewaSecretKey:process.env.ESEWA_SECRET_KEY
}

module.exports = constants