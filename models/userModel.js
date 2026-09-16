const mongoose = require("mongoose");

// Define the structure (schema) of a User document in MongoDB
const userSchema = new mongoose.Schema({ 
  // Required for auth (from Week 5) 
  name: { type: String, required: true }, // user display name 
  email: { type: String, required: true, unique: true }, // unique email 
  password: { type: String, required: true }, // hashed password 
  
  // OPTIONAL analytics fields for Week 6+ (do not break auth) 
  age: { type: Number, default: null }, // may be null if not set 
  hobbies: { type: [String], default: [] }, // array of tags 
  createdAt: { type: Date, default: Date.now } // registration time 
});

// Compile the schema into a Model named "User" (maps to "users" collection)
const User = mongoose.model("User", userSchema);

// Export the model so controllers can import and use it
module.exports = User;