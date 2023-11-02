const express = require('express');
const userPaymentInformationController = require('../controllers/userPaymentInformationController');
const router = express.Router();

router.get('/', userPaymentInformationController.getUserPayments);
router.post('/', userPaymentInformationController.addUserPayment);
router.put('/:paymentId', userPaymentInformationController.updatePayment);
router.delete('/:paymentId', userPaymentInformationController.deletePayment);

module.exports = router;
