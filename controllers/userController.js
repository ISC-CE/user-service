const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.createUser = async (req, res) => {
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
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, firstName, lastName, isActive } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.username = username;
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.isActive = isActive;
    await user.save();
    res.send('User updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.destroy();
    res.send('User deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.logout = (req, res) => {
  // Note: Implementing logout functionality usually requires storing tokens in a database or cache
  // and marking them as invalid once a user logs out. Since this example doesn't implement token storage,
  // the logout endpoint is a placeholder to show where such functionality would go.
  res.send('Logout successful');
};
