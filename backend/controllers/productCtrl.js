const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandler");
const imageDownloader = require("image-downloader");
const path = require("path");
const fs = require("fs");

const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    brand,
    category,
    price,
    addedPhotos,
    gender,
    stock,
    details,
  } = req.body;

  const newPlace = await Product.create({
    title,
    description,
    brand,
    category,
    price,
    images: addedPhotos,
    gender,
    stock,
    details,
  });

  res.json(newPlace);
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    res.status(404).json(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    id,
    title,
    description,
    brand,
    category,
    price,
    addedPhotos,
    gender,
    stock,
    details,
  } = req.body;

  const updatedProduct = await Product.findById(id);

  updatedProduct.set({
    title,
    description,
    brand,
    category,
    price,
    images: addedPhotos,
    gender,
    stock,
    details,
  });

  await updatedProduct.save();

  res.json(updatedProduct);
});

const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    
    await product.populate({
      path: "ratings",
      populate: {
        path: "user",
        model: "User",
      },
    });
    
    await product.populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
      },
    });

    res.json(product);
  } catch (error) {
    res.status(404).json(error);
  }
});

const getProductByTitle = asyncHandler(async (req, res) => {
  const { title } = req.params;
  try {
    const product = await Product.findOne({ title });

    res.json(product);
  } catch (error) {
    res.status(404).json(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
  } catch (error) {
    res.status(404).json(error);
  }
});

const uploadImageByLink = asyncHandler(async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  let rootDest = path.join(__dirname, "..");

  await imageDownloader.image({
    url: link,
    dest: rootDest + "/uploads/" + newName,
  });

  res.json(newName);
});

const uploadImages = asyncHandler(async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;

    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }

  res.json(uploadedFiles);
});

const updateReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const currentUser = await User.findById(req.user._id);
  const { rating, review } = req.body;

  try {
    const product = await Product.findById(id);
    
    product.ratings.push({ rating, user: currentUser._id });
    product.reviews.push({ review, user: currentUser._id });

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  getProductByTitle,
  updateProduct,
  deleteProduct,
  uploadImageByLink,
  uploadImages,
  updateReviews,
};
