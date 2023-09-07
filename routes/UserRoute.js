const express = require('express');
const UsersController = require('../controllers/User.js');
const AuthMeddleware = require('../middleware/Auth.js');
const router = express.Router();

router.get('/users', AuthMeddleware.verifyUser, UsersController.getUsers);
router.get('/users/:id', UsersController.getUserById);
router.post('/users', UsersController.createUser);
router.patch('/users/:id', UsersController.updateUser);
router.delete('/users/:id', UsersController.deleteUser);

module.exports = router;