const express = require('express');
const PengajuanController = require('../controllers/Pengajuan.js');

const router = express.Router();

router.get('/pengajuans', PengajuanController.getPengajuans);
router.get('/pengajuans/:id', PengajuanController.getPengajuanById);
router.post('/pengajuans', PengajuanController.createPengajuan);
router.patch('/pengajuans/:id', PengajuanController.updatePengajuan);
router.delete('/pengajuans/:id', PengajuanController.deletePengajuan);

module.exports = router;