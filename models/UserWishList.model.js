const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const UserWishList = sequelize.define('WishList', {
    wishlistId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    addedDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'UserWishList'
});

module.exports = UserWishList;