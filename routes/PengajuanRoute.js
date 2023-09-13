const express = require('express');
const PengajuanController = require('../controllers/Pengajuan.js');

const router = express.Router();

// router.get('/pengajuans', PengajuanController.getPengajuans);
router.get('/pengajuans', PengajuanController.getPengajuans);
router.get('/pengajuans/:limit&:page&:type&:status&:search', PengajuanController.getPengajuansPageSearch);
router.get('/pengajuans/:limit&:page&:type&:status', PengajuanController.getPengajuansPage);
router.post('/pengajuans', PengajuanController.createPengajuan);
router.patch('/pengajuans/:id', PengajuanController.updatePengajuan);
router.delete('/pengajuans/:id', PengajuanController.deletePengajuan);

//get with pengajuan
router.get('/pengajuan/:id', PengajuanController.getPengajuanById);
router.get('/pengajuan/:id&:limit&:page/user', PengajuanController.getPengajuanByUser);




module.exports = router;