const express = require('express');
const ExportController = require('../controllers/Export');

const router = express.Router();

router.get('/export', ExportController.exportPengajuan);

module.exports = router;