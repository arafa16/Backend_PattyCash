const Attachment = require('../models/AttachmentModel.js');
const Pengajuan = require('../models/PengajuanModel.js');
const patch = require('path');
const crypto = require('crypto');
const fs = require('fs');
const { error } = require('console');

const getAttachments = async(req, res) => {
    try {
        const response = await Attachment.findAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({mag: error})
    }
}

const createAttachment = async(req, res) => {
    const findPengajuan = await Pengajuan.findOne({
        where:{
            uuid:req.params.id
        }
    });
    
    if(!findPengajuan) return res.status(404).json({msg: "tidak ditemukan pengajuan terkait"});

    if(req.files === null) return res.status(404).json({msg: "file not found"});
    const file = req.files.attachment;
    // const fileSize = file.data.length;
    const ext = patch.extname(file.name);
    const displayName = file.name;
    const fileName = crypto.randomUUID()+ext;
    const link = `/attachments/${fileName}`;

    file.mv(`./public/attachments/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            Attachment.create({
                pengajuanId:findPengajuan.id,
                displayName:displayName,
                fileName:fileName,
                link:link
            });
            return res.status(201).json({msg: "file uploaded"});
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    });
}

const deleteAttachment = async(req, res) => {
    const response = await Attachment.findOne({
        where:{
            uuid:req.params.id
        }
    })

    if(!response) return res.status(404).json({msg: "document not found"});

    

    try {
        const filePath = `./public/attachments/${response.fileName}`;
    
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        response.destroy();

        return res.status(200).json({msg: "delete file is success"});
    } catch (error) {
        return res.status(500).json({msg: error})
    }
}

module.exports = {
    getAttachments,
    createAttachment,
    deleteAttachment
}