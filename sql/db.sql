DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE User (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    createdDate DATETIME,
    lastLoginDate DATETIME,
    isActive BOOLEAN
);

CREATE TABLE UserRole (
    roleId INT AUTO_INCREMENT PRIMARY KEY,
    roleName VARCHAR(255) NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE UserPaymentInformation (
    paymentId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    cardType VARCHAR(255),
    lastFourDigits VARCHAR(4),
    expiryDate DATE,
    paymentMethodName VARCHAR(255),
    isDefault BOOLEAN,
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE UserAddress (
    addressId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    addressLine1 VARCHAR(255),
    addressLine2 VARCHAR(255) DEFAULT NULL,
    city VARCHAR(255),
    state VARCHAR(255),
    postalCode VARCHAR(255),
    country VARCHAR(255),
    addressType VARCHAR(255),
    isDefault BOOLEAN,
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE UserWishList (
    wishlistId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    productId INT,
    addedDate DATETIME,
    FOREIGN KEY (userId) REFERENCES User(userId)
);
