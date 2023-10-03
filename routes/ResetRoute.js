const express = require('express');
const ResetController = require('../controllers/Reset.js');
const router = express.Router();

router.post('/reset',ResetController.sendEmail);
router.get('/reset/:token',ResetController.verifyToken);
router.post('/reset/:token',ResetController.resetPassword);

module.exports = router;