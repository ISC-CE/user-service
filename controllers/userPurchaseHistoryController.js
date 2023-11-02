const UserPurchaseHistory  = require('../models/UserPurchaseHistory.model');

const userPurchaseHistoryController = {
  // GET /users/:userId/purchases
  getUserPurchases: async (req, res) => {
    try {
      const userId = req.params.userId;
      const purchases = await UserPurchaseHistory.findAll({ where: { userId } });
      res.json(purchases);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST /users/:userId/purchases
  logUserPurchase: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { productId, purchaseDate, quantity, totalAmount } = req.body;
      const newPurchase = await UserPurchaseHistory.create({
        userId, productId, purchaseDate, quantity, totalAmount
      });
      res.status(201).json(newPurchase);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET /purchases/:purchaseId
  getPurchase: async (req, res) => {
    try {
      const purchaseId = req.params.purchaseId;
      const purchase = await UserPurchaseHistory.findByPk(purchaseId);
      if (!purchase) {
        return res.status(404).json({ message: 'Purchase not found' });
      }
      res.json(purchase);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE /purchases/:purchaseId
  deletePurchase: async (req, res) => {
    try {
      const purchaseId = req.params.purchaseId;
      const purchase = await UserPurchaseHistory.findByPk(purchaseId);
      if (!purchase) {
        return res.status(404).json({ message: 'Purchase not found' });
      }
      await purchase.destroy();
      res.json({ message: 'Purchase deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userPurchaseHistoryController;
