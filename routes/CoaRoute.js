const express = require('express');
const CoaController = require('../controllers/Coa.js');

const router = express.Router();

router.get('/coa', CoaController.getCoa);
router.get('/coa/:limit&:page&:status', CoaController.getCoaPageStatus);
router.get('/coa/:limit&:page', CoaController.getCoaPage);
router.get('/coa/:id', CoaController.getCoaById);
router.patch('/coa/:id', CoaController.updateCoa);
router.post('/coa', CoaController.createCoa);
router.delete('/coa/:id', CoaController.deleteCoa);

module.exports = router;