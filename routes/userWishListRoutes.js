const express = require('express');
const userWishListController = require('../controllers/userWishListController');
const router = express.Router();

router.get('/', userWishListController.getUserWishList);
router.post('/', userWishListController.addItemToWishList);
router.delete('/:wishlistId', userWishListController.removeItemFromWishList);

module.exports = router;
