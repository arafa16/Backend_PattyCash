const express = require('express');
const TypePengajuanController = require('../controllers/TypePengajuan.js');

const router = express.Router();

router.get('/typePengajuans', TypePengajuanController.getTypePengajuans);
router.get('/typePengajuans/:limit&:page&:status', TypePengajuanController.getTypePengajuanPageByStatus);
router.get('/typePengajuans/:limit&:page', TypePengajuanController.getTypePengajuanPage);
router.get('/typePengajuans/:id', TypePengajuanController.getTypePengajuanById);
router.post('/typePengajuans', TypePengajuanController.createTypePengajuan);
router.patch('/typePengajuans/:id', TypePengajuanController.updateTypePengajuan);
router.delete('/typePengajuans/:id', TypePengajuanController.deleteTypePengajuan);

module.exports = router;