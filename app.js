const express = require('express'); // Import Express framework
const app = express(); // Initialize the Express app
const PORT = 3000;

app.use(express.json()); // Middleware: parse incoming JSON requests

// Temporary in-memory data store
// NOTE: This is a quick storage object just for this week.
// We'll replace it with MongoDB (via Mongoose Models) in Week 4.
const tempStore = { users: [] };
app.use((req, res, next) => {
  req.store = tempStore;                       // Attach the shared store to each request
  next();                                      // Move on to the next middleware
});

const homeRoutes = require('./routes/homeRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes'); // Bring in the user routes

app.use('/', homeRoutes);
app.use('/', aboutRoutes);
app.use('/', contactRoutes);
app.use('/api', userRoutes); // Mount them under /api prefix

// 404 middleware (for routes not found)
app.use((req, res, next) => res.status(404).json({ message: 'Route not found' }));
 
// Centralized error handler (for unexpected errors)
app.use((err, req, res, next) => {
  console.error(err);        // Log the actual error for debugging 
  return res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});