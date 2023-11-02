const UserAddress  = require('../models/UserAddress.model');

const userAddressController = {
    // GET /users/:userId/addresses
    getUserAddresses: async (req, res) => {
        try {
            const userId = req.params.userId;
            const addresses = await UserAddress.findAll({ where: { userId } });
            res.json(addresses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // POST /users/:userId/addresses
    addUserAddress: async (req, res) => {
        try {
            const userId = req.params.userId;
            const addressData = { userId, ...req.body };
            const newAddress = await UserAddress.create(addressData);
            res.status(201).json(newAddress);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // PUT /addresses/:addressId
    updateAddress: async (req, res) => {
        try {
            const addressId = req.params.addressId;
            const address = await UserAddress.findByPk(addressId);
            if (!address) {
                return res.status(404).json({ message: 'Address not found' });
            }
            Object.assign(address, req.body);
            await address.save();
            res.json({ message: 'Address updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // DELETE /addresses/:addressId
    deleteAddress: async (req, res) => {
        try {
            const addressId = req.params.addressId;
            const address = await UserAddress.findByPk(addressId);
            if (!address) {
                return res.status(404).json({ message: 'Address not found' });
            }
            await address.destroy();
            res.json({ message: 'Address deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = userAddressController;
