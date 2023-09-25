const express = require('express');
const PtjbController = require('../controllers//Ptjb');

const router = express.Router();

router.get('/ptjb', PtjbController.getPtjb);
router.get('/ptjb/:id', PtjbController.getPtjbById);
router.post('/ptjb', PtjbController.createPtjb);
router.patch('/ptjb/:id', PtjbController.updatePtjb);
router.delete('/ptjb/:id', PtjbController.deletePtjb);

module.exports = router;