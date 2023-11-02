const  UserPaymentInformation  = require('../models/UserPaymentInformation.model');

const userPaymentInformationController = {
  // GET /users/:userId/payments
  getUserPayments: async (req, res) => {
    try {
      const userId = req.params.userId;
      const payments = await UserPaymentInformation.findAll({ where: { userId } });
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST /users/:userId/payments
  addUserPayment: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { cardType, lastFourDigits, expiryDate, paymentMethodName, isDefault } = req.body;
      const newPayment = await UserPaymentInformation.create({
        userId, cardType, lastFourDigits, expiryDate, paymentMethodName, isDefault
      });
      res.status(201).json(newPayment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // PUT /payments/:paymentId
  updatePayment: async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      const { cardType, lastFourDigits, expiryDate, paymentMethodName, isDefault } = req.body;
      const payment = await UserPaymentInformation.findByPk(paymentId);
      if (!payment) {
        return res.status(404).json({ message: 'Payment information not found' });
      }
      payment.cardType = cardType;
      payment.lastFourDigits = lastFourDigits;
      payment.expiryDate = expiryDate;
      payment.paymentMethodName = paymentMethodName;
      payment.isDefault = isDefault;
      await payment.save();
      res.json({ message: 'Payment information updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE /payments/:paymentId
  deletePayment: async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      const payment = await UserPaymentInformation.findByPk(paymentId);
      if (!payment) {
        return res.status(404).json({ message: 'Payment information not found' });
      }
      await payment.destroy();
      res.json({ message: 'Payment information deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userPaymentInformationController;
