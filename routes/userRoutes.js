const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

const userRoleRoutes = require('./userRoleRoutes');
const userPurchaseHistoryRoutes = require('./userPurchaseHistoryRoutes');
const userPaymentInformationRoutes = require('./userPaymentInformationRoutes');
const userAddressRoutes = require('./userAddressRoutes');
const userWishListRoutes = require('./userWishListRoutes');

const authenticateToken = require('../middleware/authenticateToken');

// User Management Routes
// These routes handle various user-related operations as described below

// POST /users - Creates a new user
// Expects a JSON body with user information (username, password, email, firstName, lastName)
router.post('/', userController.createUser);

// GET /users/:userId - Retrieves information about a specific user based on their ID
// The user's ID is passed as a parameter in the URL
router.get('/:userId',authenticateToken, userController.getUser);

// PUT /users/:userId - Updates information for a specific user based on their ID
// Expects a JSON body with user information to be updated (username, email, firstName, lastName, isActive)
// The user's ID is passed as a parameter in the URL
router.put('/:userId', authenticateToken,userController.updateUser);

// DELETE /users/:userId - Deletes a specific user based on their ID
// The user's ID is passed as a parameter in the URL
router.delete('/:userId', authenticateToken, userController.deleteUser);

// POST /users/login - Logs in a user
// Expects a JSON body with login credentials (username, password)
router.post('/login', userController.login);

router.use('/:userId/roles', authenticateToken, userRoleRoutes);
router.use('/:userId/purchases', authenticateToken, userPurchaseHistoryRoutes);
router.use('/:userId/payment', authenticateToken, userPaymentInformationRoutes);
router.use('/:userId/addresses', authenticateToken,userAddressRoutes);
router.use('/:userId/wishlist', authenticateToken, userWishListRoutes);

module.exports = router;