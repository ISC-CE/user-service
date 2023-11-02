const UserWishList  = require('../models/UserWishList.model');

const userWishListController = {
    // GET /users/:userId/wishlist
    getUserWishList: async (req, res) => {
        try {
            const userId = req.params.userId;
            const wishList = await UserWishList.findAll({ where: { userId } });
            res.json(wishList);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // POST /users/:userId/wishlist
    addItemToWishList: async (req, res) => {
        try {
            const userId = req.params.userId;
            const { productId, addedDate } = req.body;
            const newItem = await UserWishList.create({ userId, productId, addedDate });
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // DELETE /wishlist/:wishlistId
    removeItemFromWishList: async (req, res) => {
        try {
            const wishlistId = req.params.wishlistId;
            const item = await UserWishList.findByPk(wishlistId);
            if (!item) {
                return res.status(404).json({ message: 'Wish list item not found' });
            }
            await item.destroy();
            res.json({ message: 'Item removed from wish list successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userWishListController;
