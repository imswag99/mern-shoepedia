const Order = require('../models/orderModel');
const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandler");

const createOrderByCod = asyncHandler(async (req, res) => {
  const { cart, cartAmount, orderDate } = req.body;
  
  try {
    const newOrder = await Order.create({
      user: req.user._id,
      products: cart,
      amount: cartAmount,
      paymode: "COD",
      orderDate
    });
    
    res.json(newOrder);
  } catch (error) {
    res.status(422).json(error);
  }
});

const createOrderByPaypal = asyncHandler(async (req, res) => {
  const { cart, cartAmount, orderDate } = req.body;
  
  try {
    const customer = await User.findById(req.user._id);
    const newOrder = await Order.create({
      user: customer._id,
      products: cart,
      amount: cartAmount,
      paymode: "PayPal",
      paystatus: "paid",
      orderDate
    });
    
    res.json(newOrder);
  } catch (error) {
    res.status(422).json(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user');

    res.json(orders);
  } catch (error) {
    res.status(404).json(error);
  }
});

const getOrderByOrderId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);

    res.json(order);
  } catch (error) {
    res.status(404).json(error);
  }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
  try {
    const order = await Order.find({user: req.user._id});

    res.json(order);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = { createOrderByCod, createOrderByPaypal, getOrderByOrderId, getOrderByUserId, getAllOrders }