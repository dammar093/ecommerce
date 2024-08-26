const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const uploadOnCloudinary = require("../service/cloudinary");
const Product = require("../models/product");
const { v2 } = require("cloudinary");
const { quickSortProductAfterDiscount, quickSortRating } = require("../utils/quickSort");
const Review = require("../models/review");

const addProduct = asyncHandler(async (req, res) => {
  const {
    title,
    price,
    brand,
    colors,
    sizes,
    description,
    quantity,
    category,
    discount,
    stock,
  } = req.body;
  const files = req.files;
  //  console.log(colors,sizes);

  if (!title) {
    throw new ApiError(400, "Title is required!");
  }
  if (!description) {
    throw new ApiError(400, "Description is required!");
  }
  if (!price) {
    throw new ApiError(400, "Price is required!");
  }
  if (!brand) {
    throw new ApiError(400, "Brand is required!");
  }
  if (!category) {
    throw new ApiError(400, "Category is required!");
  }

  if (!quantity) {
    throw new ApiError(400, "Quantity is required!");
  }
  if (!files || files.length === 0) {
    throw new ApiError(400, "Images are required!");
  }
  // Convert colors and sizes to arrays if they are strings
  const colorArray =
    typeof colors === "string" ? colors.trim().split(",") : colors;
  const sizeArray = typeof sizes === "string" ? sizes.trim().split(",") : sizes;
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
      colors: colorArray.length > 1 ? colorArray : [],
      sizes: sizeArray.length > 1 ? sizeArray : [],
    });

    return res
      .status(201)
      .json(new ApiResponse(201, product, "Product added successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    const productData = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ product: product._id })
          .populate("user", "fullName avatar")
          .populate("user", "fullName avatar");
        const averageRating = reviews.length
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
          : 0;
        return {
          ...product.toObject(),
          reviews,
          averageRating: averageRating.toFixed(1),
        };
      })
    );
    return res
      .status(200)
      .json(new ApiResponse(200, productData, "product fetched successfuly"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
});

const getBestDealsProguct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ discountPercentage: "desc" });
    const productData = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ product: product._id });
        const averageRating = reviews.length
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
          : 0;
        return {
          ...product.toObject(),
          reviews,
          averageRating: averageRating.toFixed(1),
        };
      })
    );
    return res
      .status(200)
      .json(new ApiResponse(200, productData, "product fetched successfuly"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
});

const getHighRatedProduct = asyncHandler(async (req, res) => {
  try {
    let products = await Product.find();
    const productData = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ product: product._id })
          .populate("user", "fullName avatar")
          .populate("user", "fullName avatar");
        const averageRating = reviews.length
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
          : 0;
        return {
          ...product.toObject(),
          reviews,
          averageRating: averageRating.toFixed(1),
        };
      })
    );
    products = quickSortRating(productData)

    return res
      .status(200)
      .json(new ApiResponse(200, products, "product fetched successfuly"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
});
const getNewArrivalProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    const productData = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ product: product._id });

        const averageRating = reviews.length
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
          : 0;
        return {
          ...product.toObject(),
          reviews,
          averageRating: averageRating.toFixed(1),
        };
      })
    );
    return res
      .status(200)
      .json(new ApiResponse(200, productData, "product fetched successfuly"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, {}, "Something went wrong internally"));
  }
});

const deleteProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete({ _id: id });
  if (!deleteProducts) {
    throw new ApiError(500, "Failed to delete product");
  }
  for (let id of deleteProducts.imagesId) {
    await v2.uploader.destroy(id);
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { id: deleteProducts._id }, "Deleted successfuly")
    );
});

const getProductByPage = asyncHandler(async (req, res) => {
  let page = 1;
  if (req.params.page) {
    page = Number(req.params.page);
  }
  const total = await Product.countDocuments();
  const pageSize = 12;
  let skipValue = (page - 1) * pageSize;
  // console.log(skipValue);

  // console.log(total)
  const products = await Product.find().skip(skipValue).limit(pageSize);
  const productData = await Promise.all(
    products.map(async (product) => {
      const reviews = await Review.find({ product: product._id })
        .populate("user", "fullName avatar")
        .populate("user", "fullName avatar");
      const averageRating = reviews.length
        ? reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length
        : 0;
      return {
        ...product.toObject(),
        reviews,
        averageRating: averageRating.toFixed(1),
      };
    })
  );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: productData, total: total },
        "product fetched successfuly"
      )
    );
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the product by its ID
    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    // Fetch reviews related to the product and populate user details
    const reviews = await Review.find({ product: id }).populate(
      "user",
      "fullName avatar"
    );
    const averageRating = reviews.length
      ? reviews.reduce((acc, review) => acc + review.rating, 0) /
      reviews.length
      : 0;
    // Combine product and reviews data
    const productData = {
      ...product.toObject(), // Convert Mongoose document to plain object
      reviews,
      averageRating: averageRating.toFixed(1),
    };

    return res
      .status(200)
      .json(new ApiResponse(200, productData, "Product fetched successfully"));
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new ApiError(500, "Server error");
  }
});

const getRelatedProduct = asyncHandler(async (req, res) => {
  const { category } = req.params;
  // console.log(category);

  try {
    const relatedProducts = await Product.find({ category: { $eq: category } });
    if (!relatedProducts) {
      throw new ApiError(404, "Product not found");
    }
    const productData = await Promise.all(
      relatedProducts.map(async (product) => {
        const reviews = await Review.find({ product: product._id });

        const averageRating = reviews.length
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
          : 0;
        return {
          ...product.toObject(),
          reviews,
          averageRating: averageRating.toFixed(1),
        };
      })
    );
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          productData,
          "Related products fetched successfuly"
        )
      );
  } catch (error) {
    throw new ApiError(500, "server Error");
  }
});

const getFiltredPRoducts = asyncHandler(async (req, res) => {
  try {
    const { sort, order, page } = req.params;
    const skipValue = 12;
    let total = await Product.countDocuments();
    let products = await Product.find({})
      .skip((Number(page) - 1) * skipValue)
      .limit(skipValue);
    products = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ product: product._id });

        const averageRating = reviews.length
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
          : 0;
        return {
          ...product.toObject(),
          reviews,
          averageRating: averageRating.toFixed(1),
        };
      })
    );
    if (sort === "rating") {
      products = quickSortRating(products)
    }
    if (sort === "price") {
      products = quickSortProductAfterDiscount(products, order);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: products, total: total },
          "products Fetched sucessfuly"
        )
      );
  } catch (error) {
    throw new ApiError(500, "something went wrong");
  }
});
// getSearched items
const getProductsBySearch = asyncHandler(async (req, res) => {
  const { search, page, sort, order } = req.params;

  try {
    const produtcsCount = await Product.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    });
    let products = await Product.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    })
      .skip((page - 1) * 12)
      .limit(12);

    products = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ product: product._id });
        const averageRating = reviews.length
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
          : 0;
        return {
          ...product.toObject(),
          reviews,
          averageRating: averageRating.toFixed(1),
        };
      })
    );
    if (!products) {
      throw new ApiError(400, "404 product not found");
    }
    if (sort === "rating") {
      products = quickSortRating(products)
    }
    if (sort === "price") {
      products = quickSortProductAfterDiscount(products, order);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: products, total: produtcsCount.length },
          "fetched product successfuly"
        )
      );
  } catch (error) {
    throw new ApiError(500, "server error");
  }
});

//get product by category
const getProductBycategory = asyncHandler(async (req, res) => {
  const { category, page, sort, order } = req.params;


  try {
    const produtcsCount = await Product.find({ category: category });
    let products = await Product.find({ category: category })
      .skip((page - 1) * 12)
      .limit(12);
    products = await Promise.all(
      products.map(async (product) => {
        const reviews = await Review.find({ product: product._id })
          .populate("user", "fullName avatar")
          .populate("user", "fullName avatar");
        const averageRating = reviews.length
          ? reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
          : 0;
        return {
          ...product.toObject(),
          reviews,
          averageRating: averageRating.toFixed(1),
        };
      })
    );

    if (!products) {
      throw new ApiError(400, "404 product not found");
    }
    if (sort === "rating") {
      products = quickSortRating(products)
    }
    if (sort === "price") {
      products = quickSortProductAfterDiscount(products, order);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { data: products, total: produtcsCount.length },
          "fetched product successfuly"
        )
      );
  } catch (error) {
    throw new ApiError(500, "server error");
  }
});

// upadate product details
const upadateProduct = asyncHandler(async (req, res) => {
  const {
    title,
    price,
    brand,
    colors,
    sizes,
    description,
    category,
    discount,
    id,
    stock,
  } = req.body;
  // console.log(req.body);

  try {
    const product = await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: title,
          price: Number(price),
          discountPercentage: Number(discount),
          stock: stock,
          category: category,
          brand: brand,
          description: description,
          colors: colors,
          sizes: sizes,
        },
      },
      { new: true }
    );

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, product, "Product update sucessfully"));
  } catch (error) {
    throw new ApiError(500, "server error");
  }
});

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
  getProductBycategory,
  upadateProduct,
};
