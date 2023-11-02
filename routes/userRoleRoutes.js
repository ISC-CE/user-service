const express = require('express');
const userRoleController = require('../controllers/userRoleController');
const router = express.Router({ mergeParams: true });

router.get('/', userRoleController.getUserRoles);
router.post('/', userRoleController.addUserRole);
router.delete('/:roleId', userRoleController.deleteUserRole);

module.exports = router;
