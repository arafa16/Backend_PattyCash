const AttachmentController = require('../controllers/Attachment.js');
const express = require('express');
const router = express.Router();

router.get('/attachments', AttachmentController.getAttachments);
router.post('/attachments/:id', AttachmentController.createAttachment);
router.delete('/attachments/:id', AttachmentController.deleteAttachment);

module.exports = router;
