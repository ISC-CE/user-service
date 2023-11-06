// Importing required modules
require('dotenv').config();               // dotenv is a package for loading environment variables from a .env file
const express = require('express');       // Express is a web application framework for Node.js
const cors = require('cors');             // CORS is a package for enabling CORS (Cross-Origin Resource Sharing)
const authenticateToken = require('./middlewares/authenticateToken');

const userRoutes = require('./routes/userRoutes');             // Importing userRoutes for handling user-related routes
const userPaymentInformationRoutes = require('./routes/userPaymentInformationRoutes'); // Importing userPaymentInformationRoutes for handling payment information-related routes
const userAddressRoutes = require('./routes/userAddressRoutes'); // Importing userAddressRoutes for handling address-related routes
const userWishListRoutes = require('./routes/userWishListRoutes'); // Importing userWishListRoutes for handling wishlist-related routes

const app = express(); // Creating an instance of an Express application

// Middleware
app.use(express.json()); // This middleware is used to parse incoming JSON payloads and is based on body-parser.
app.use(cors());         // Enabling CORS for all routes. In production, you might want to configure this to allow only specific origins.

// User Management Routes
app.use('/users', userRoutes);
app.use('/payment', authenticateToken, userPaymentInformationRoutes)
app.use('/addresses', authenticateToken, userAddressRoutes)
app.use('/wishlist', authenticateToken, userWishListRoutes)

module.exports = app; // Exporting the Express app to be imported in other files

// Starting the server
// The Server is set to listen on port 3000, and it logs a message to the console once it's running
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

