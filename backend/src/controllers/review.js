const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const Review = require("../models/review");


const addReview = asyncHandler(async (req, res) => {
  const { product, rating, review } = req.body
  console.log(req.body);

  try {
    const reviewData = await Review.create({
      user: req.user._id,
      product: product,
      rating: rating,
      review: review
    })
    return res.status(200).json(new ApiResponse(200, reviewData, "added review"))
  } catch (error) {
    throw new ApiError(500, "server error")
  }
})

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "fullName avatar")
      .populate("product")

    if (!reviews) {
      throw new ApiError(404, "Reviews not found");
    }
    return res.status(200).json(new ApiResponse(200, reviews, "Get reviews successfully"));
  } catch (error) {
    throw new ApiError(500, "Server error");
  }
});

const countReview = asyncHandler(async (req, res) => {
  try {
    const totalReview = await Review.countDocuments()
    return res.status(200).json(new ApiResponse(200, { total: totalReview }, "total"))
  } catch (error) {
    throw new ApiError(500, "server error")
  }
})


module.exports = {
  getAllProducts,
  addReview,
  countReview
}