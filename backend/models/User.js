
const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
  names: { type: String, required: [true,"The Name Is Required"] },
  email: { type: String, required: [true,"The email Is Required"], unique: true },
  password: { type: String, required:  [true,"The Password  Is Required"] },
  // image: { type: String },
  role: { type: String, enum:["admin","user","manager"],default: 'user' }
});

// Create a model
const User = mongoose.model('User', userSchema);

module.exports = User;