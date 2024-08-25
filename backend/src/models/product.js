const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,  
      required:true
    },
    description: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
    },
    sizes: {
      type: [String],
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],  // You can also specify more detailed validation here if needed
      required: true,
    },
    imagesId: {
      type: [String],
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
