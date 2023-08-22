const express = require('express');
const AuthController = require('../controllers/Auth.js');

const router = express.Router();

router.post('/login', AuthController.Login);
router.get('/me', AuthController.getMe);
router.delete('/logout', AuthController.Logout);

module.exports = router;