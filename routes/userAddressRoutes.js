const express = require('express');
const userAddressController = require('../controllers/userAddressController');
const router = express.Router();

router.get('/', userAddressController.getUserAddresses);
router.post('/', userAddressController.addUserAddress);
router.put('/:addressId', userAddressController.updateAddress);
router.delete('/:addressId', userAddressController.deleteAddress);

module.exports = router;
