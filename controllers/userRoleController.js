const UserRole = require('../models/UserRole.model');

const userRoleController = {
  // GET /users/:userId/roles
  getUserRoles: async (req, res) => {
    try {
      const userId = req.params.userId;
      const roles = await UserRole.findAll({ where: { userId } });
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST /users/:userId/roles
  addUserRole: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { roleName } = req.body;
      const newRole = await UserRole.create({ userId, roleName });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE /users/:userId/roles/:roleId
  deleteUserRole: async (req, res) => {
    try {
      const { userId, roleId } = req.params;
      await UserRole.destroy({ where: { userId, roleId } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userRoleController;
