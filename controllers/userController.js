// Create User
 
exports.createUser = (req, res) => {
   const { id, name, email } = req.body || {};   // Extract fields from request body
  if (!id || !name || !email) {                 // Check if required fields exist
    return res.status(400).json({ message: 'id, name, and email are required.' });
}
 
// Prevent duplicate IDs
const exists = req.store.users.find(u => u.id === Number(id));
if (exists) return res.status(409).json({ message: 'User id already exists.' });
 
// Add new user to the in-memory store
req.store.users.push({ id: Number(id), name, email });
 
// Respond with 201 (Created) status code
return res.status(201).json({ message: 'User created' });
};
 
// Get All Users
exports.getUsers = (req, res) => {
  return res.status(200).json(req.store.users); // Simply return the full array
};
 
// Get User by ID
exports.getUserById = (req, res) => {
  const id = Number(req.params.id);          // Extract ID from URL parameters
   const user = req.store.users.find(u => u.id === id);     // Look for user in array
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.status(200).json(user); // Return the user object
};