const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const bcrypt = require('bcrypt');

// Register Function
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Make sure this path matches your setup

const Register = async (req, res) => {
  try {
    const { names, email, password, role } = req.body;

    // Validate required fields
    console.log(req.body)
    if (!names || !email || !password ) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // Ensure password is defined
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    // Hash password
    const hashpassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Create and save the new user
    const newUser = new User({
      names,
      email,
      password: hashpassword,
      role,
    
    });
    await newUser.save();

    res.status(200).send({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "An error occurred during registration", error });
  }
};

// Login Function
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASS){

      const token = jwt.sign({email,role:"admin"},process
        .env.Scret_Key,{
          expiresIn:"1h"
        }
      )
      return res.status(200).json({token,role:"admin"})
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    // Validate password
    const isValidPassword = await bcrypt.compare(password,user.password);
    if (!isValidPassword) {
      console.log(user.password, password);
      return res.status(400).send({message: 'Invalid Password',password});
    }

    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.Scret_Key, {
      expiresIn: '1h',
    });

    res.status(200).header('auth-token', token).send({
      message: 'Login Successful',
      token: token,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
module.exports = { Register, Login };
