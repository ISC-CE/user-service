const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const userRoleRoutes = require('./userRoleRoutes');
const userPaymentInformationRoutes = require('./userPaymentInformationRoutes');
const userAddressRoutes = require('./userAddressRoutes');
const userWishListRoutes = require('./userWishListRoutes');

const authenticateToken = require('../middlewares/authenticateToken');
const authenticateUserId = require('../middlewares/authenticateUserId');

// User Management Routes
// These routes handle various user-related operations as described below

// POST /users - Creates a new user
// Expects a JSON body with user information (username, password, email, firstName, lastName)
router.post('/', userController.createUser);

// GET /users/:userId - Retrieves information about a specific user based on their ID
// The user's ID is passed as a parameter in the URL
router.get('/:userId',authenticateToken,authenticateUserId, userController.getUser);

// PUT /users/:userId - Updates information for a specific user based on their ID
// Expects a JSON body with user information to be updated (username, email, firstName, lastName, isActive)
// The user's ID is passed as a parameter in the URL
router.put('/:userId', authenticateToken,authenticateUserId,userController.updateUser);

// DELETE /users/:userId - Deletes a specific user based on their ID
// The user's ID is passed as a parameter in the URL
router.delete('/:userId', authenticateToken,authenticateUserId, userController.deleteUser);

// POST /users/login - Logs in a user
// Expects a JSON body with login credentials (username, password)
router.post('/login', userController.login);

router.use('/:userId/roles', authenticateToken, authenticateUserId, userRoleRoutes);
router.use('/:userId/payment', authenticateToken, authenticateUserId, userPaymentInformationRoutes);
router.use('/:userId/addresses', authenticateToken,authenticateUserId, userAddressRoutes);
router.use('/:userId/wishlist', authenticateToken,authenticateUserId, userWishListRoutes);

module.exports = router;