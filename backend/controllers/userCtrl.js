const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../middlewares/asyncHandler");
const generateToken = require("../utils/createToken");

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, house, locality, pincode, city, state, country } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address: {
        house,
        locality,
        pincode,
        city,
        state,
        country
      }
    });

    res.json(newUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (isPasswordValid) {
      const token = generateToken(userExists._id);

      // Set jwt as an httpOnly cookie
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .json({
          _id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          isAdmin: userExists.isAdmin,
        });
    } else {
      res.status(401).json("pass not ok");
    }
  } else {
    res.status(404).json("User not found");
  }
});

const profile = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  if (currentUser) {
    res.json({
      _id: currentUser._id,
      name: currentUser.name,
      email: currentUser.email,
      isAdmin: currentUser.isAdmin,
    });
  } else {
    res.status(404).json("user not found");
  }
});

const logout = (req, res) => {
  res.cookie("token", "").json(true);
};

const updateCurrentUser = asyncHandler(async (req, res) => {
  const { newName, password, confirmPassword } = req.body;

  try {
    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const currentUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: newName,
          password: hashedPassword,
        },
        { new: true }
      );

      res.json(currentUser);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

const updateUserAddress = asyncHandler(async (req, res) => {
  const { house, locality, pincode, city, state, country } = req.body;
  try {
    const currentUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        address: { house, locality, pincode, city, state, country },
      },
      { new: true }
    );

    const userAddress = currentUser.address;
    res.json(userAddress);
  } catch (error) {
    res.status(422).json(error);
  }
});

const getUserAddress = asyncHandler(async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const userAddress = currentUser.address;
    res.json(userAddress);
  } catch (error) {
    res.status(422).json(error);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({isAdmin: false});
    res.json(users);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = {
  createUser,
  login,
  profile,
  logout,
  updateCurrentUser,
  updateUserAddress,
  getUserAddress,
  getAllUsers
};
