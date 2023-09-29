const express = require('express');
const StatusController = require('../controllers/Status.js');

const router = express.Router();

router.get('/status', StatusController.getStatus);
router.get('/status/:limit&:page&:status', StatusController.getStatusPageByStatus);
router.get('/status/:limit&:page', StatusController.getStatusPage);
router.get('/status/select', StatusController.getStatusSelect);
router.get('/status/:id', StatusController.getStatusById);
router.get('/status/:id/code', StatusController.getStatusByCode);
router.post('/status', StatusController.createStatus);
router.patch('/status/:id', StatusController.updateStatus);
router.delete('/status/:id', StatusController.deleteStatus);

module.exports = router;