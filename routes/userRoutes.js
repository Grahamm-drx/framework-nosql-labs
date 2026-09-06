// routes/userRoutes.js
const express = require("express"); // Import Express to build routes
const router = express.Router(); // Create router instance
const userController = require("../controllers/userController"); // CRUD controllers
const auth = require("../middleware/authMiddleware"); // JWT auth middleware

// Public routes (if any) would go here

// Protected routes: require a valid JWT to access
router.get("/users", auth, userController.getUsers); // List users only if token is valid
router.get("/users/:id", auth, userController.getUserById); // Get user by id if token valid

// (If you have create/update/delete users, you may protect them too)
router.post("/users", auth, userController.createUser);
router.put("/users/:id", auth, userController.updateUser);
router.delete("/users/:id", auth, userController.deleteUser);

// Export the router to be mounted in app.js at /api
module.exports = router;