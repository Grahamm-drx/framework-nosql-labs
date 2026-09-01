const User = require("../models/userModel");

// CREATE USER
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body); // Save to MongoDB Atlas
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};