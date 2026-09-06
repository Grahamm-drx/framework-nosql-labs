const mongoose = require("mongoose");

// Define the structure (schema) of a User document in MongoDB
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  age: { 
    type: Number, 
    min: 0 
  },
  password: { 
    type: String, 
    required: true 
  }
});

// Compile the schema into a Model named "User" (maps to "users" collection)
const User = mongoose.model("User", userSchema);

// Export the model so controllers can import and use it
module.exports = User;