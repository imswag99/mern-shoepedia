const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('./asyncHandler');

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, {});
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

module.exports = { authenticate, authorizeAdmin };
