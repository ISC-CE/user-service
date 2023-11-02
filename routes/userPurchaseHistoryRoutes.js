const express = require('express');
const userPurchaseHistoryController = require('../controllers/userPurchaseHistoryController');
const router = express.Router({ mergeParams: true });

router.get('/', userPurchaseHistoryController.getUserPurchases);
router.post('/', userPurchaseHistoryController.logUserPurchase);
router.get('/:purchaseId', userPurchaseHistoryController.getPurchase);
router.delete('/:purchaseId', userPurchaseHistoryController.deletePurchase);

module.exports = router;
