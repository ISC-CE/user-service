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

const User = sequelize.define('User', {
    // Model attributes
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  createdDate: {
    type: DataTypes.DATE
  },
  lastLoginDate: {
    type: DataTypes.DATE
  },
  isActive: {
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: false,
  tableName: 'User'
});

module.exports = User;
