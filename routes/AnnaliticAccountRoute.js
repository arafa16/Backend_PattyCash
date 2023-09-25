const express = require('express');
const AnnalitictAccoutController = require('../controllers/AnnaliticAccount');
const router = express.Router();

router.get('/annaliticAccount', AnnalitictAccoutController.getAnnaliticAccounts);
router.get('/annaliticAccount/:id', AnnalitictAccoutController.getAnnaliticAccountById);
router.post('/annaliticAccount', AnnalitictAccoutController.createAnnaliticAccount);
router.patch('/annaliticAccount/:id', AnnalitictAccoutController.updateAnnaliticAccount);
router.delete('/annaliticAccount/:id', AnnalitictAccoutController.deleteAnnaliticAccount);

module.exports = router;