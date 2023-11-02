const config = require("../configs/db.config.js");

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

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