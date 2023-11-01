const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// User Management Routes
// These routes handle various user-related operations as described below

// POST /users - Creates a new user
// Expects a JSON body with user information (username, password, email, firstName, lastName)
router.post('/', userController.createUser);

// GET /users/:userId - Retrieves information about a specific user based on their ID
// The user's ID is passed as a parameter in the URL
router.get('/:userId', userController.getUser);

// PUT /users/:userId - Updates information for a specific user based on their ID
// Expects a JSON body with user information to be updated (username, email, firstName, lastName, isActive)
// The user's ID is passed as a parameter in the URL
router.put('/:userId', userController.updateUser);

// DELETE /users/:userId - Deletes a specific user based on their ID
// The user's ID is passed as a parameter in the URL
router.delete('/:userId', userController.deleteUser);

// POST /users/login - Logs in a user
// Expects a JSON body with login credentials (username, password)
router.post('/login', userController.login);

// POST /users/logout - Logs out the currently logged-in user
// Since this is a stateless API, the client should handle the removal of the authentication token
router.post('/logout', userController.logout);

module.exports = router;