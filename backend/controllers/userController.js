const generateToken = require("../config/generateToken");
const User = require("../models/users");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Please fill all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  try {
    const user = await User.create({
      name,
      email,
      password, // will be hashed via schema hook
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
    res.status(500).send("Failed to register user");
  }
};
const authUser = async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).send("Please fill all fields");
  }
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
};

module.exports = { registerUser,authUser };
