const express = require('express');
const StatusController = require('../controllers/Status.js');

const router = express.Router();

router.get('/status', StatusController.getStatus);
router.get('/status/:id', StatusController.getStatusById);
router.post('/status', StatusController.createStatus);
router.patch('/status/:id', StatusController.updateStatus);
router.delete('/status/:id', StatusController.deleteStatus);

module.exports = router;