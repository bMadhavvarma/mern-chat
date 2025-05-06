const generateToken = require("../config/generateToken");
const User = require("../models/users");

// @desc    Register new user
// @route   POST /api/user/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Please fill all fields");
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password, // Password will be hashed in the schema pre-save hook
      pic: pic || undefined, // Use default if not provided
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });

    console.log("User registered successfully");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Failed to register user");
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/user/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please fill all fields");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("User not found");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });

    console.log("User logged in successfully");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Login failed");
  }
};

module.exports = { registerUser, authUser };
