const generateToken = require("../config/generateToken");
const User = require("../models/users");

const registerUser = async(req, res) => {
    // Add your registration logic here
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Please fill all fields");
    }
    const userExists=await User.findOne({email});
    if(userExists){
      return res.status(400).send("User already exists");
    }
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
   console.log("User registered successfully");
  };
  

  module.exports = { registerUser };
  