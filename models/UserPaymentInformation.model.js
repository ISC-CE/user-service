const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const UserPaymentInformation = sequelize.define('Payment', {
    paymentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cardType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastFourDigits: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    paymentMethodName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'UserPaymentInformation'
});

module.exports = UserPaymentInformation;