const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const userController = {
  // POST /users
  createUser: async (req, res) => {
    try {
      const { username, password, email, firstName, lastName } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
        createdDate: new Date(),
        isActive: true
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET /users/:userId
  getUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // PUT /users/:userId
  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { username, email, firstName, lastName, isActive } = req.body;
      

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.username = username || user.username;
      user.email = email || user.email;
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.isActive = (isActive !== undefined) ? isActive : user.isActive;
      await user.save();
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE /users/:userId
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST /users/login
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = userController;
