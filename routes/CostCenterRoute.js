const express = require('express');
const CostCenterController = require('../controllers/CostCenter');

const router = express.Router();

router.get('/costCenter', CostCenterController.getCostCenters);
router.get('/costCenter/:limit&:page&:status', CostCenterController.getCostCentersPageByStatus);
router.get('/costCenter/:limit&:page', CostCenterController.getCostCentersPage);
router.get('/costCenter/:id', CostCenterController.getCostCenterById);
router.post('/costCenter', CostCenterController.createCostCenter);
router.patch('/costCenter/:id', CostCenterController.updateCostCenter);
router.delete('/costCenter/:id', CostCenterController.deleteCostCenter);

module.exports = router;