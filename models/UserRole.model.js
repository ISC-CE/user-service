const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const UserRole = sequelize.define('UserRole', {
  // Model attributes
  roleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'UserRole',
  
});

module.exports = UserRole;
