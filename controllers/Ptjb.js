const Pengajuan = require('../models/PengajuanModel');
const Ptjb = require('../models/PtjbModel');

const getPtjb = async(req, res) => {
    try {
        const response = await Ptjb.findAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getPtjbById = async(req, res) => {
    try {
        const response = await Ptjb.findOne({
            include:{
                model:Pengajuan
            },
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const createPtjb = async(req, res) => {
    const {nominal, keterangan, pengajuanId} = req.body;

    const findPengajuan = await Pengajuan.findOne({
        where:{
            uuid:pengajuanId
        }
    });

    if(!findPengajuan) return res.status(200).json({msg: "pengajuan not found"});

    try {
        await Ptjb.create({
            nominal:nominal,
            keterangan:keterangan,
            pengajuanId: findPengajuan.id
        });

        return res.status(200).json({msg: "create ptjb success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const updatePtjb = async(req, res) => {
    const {nominal, keterangan} = req.body;

    const findPtjb = await Ptjb.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findPtjb) return res.status(200).json({msg: "ptjb not found"});

    try {
        await findPtjb.update({
            nominal:nominal,
            keterangan:keterangan
        });

        return res.status(201).json({msg: "update ptjb success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const deletePtjb = async(req, res) => {

    const findPtjb = await Ptjb.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findPtjb) return res.status(200).json({msg: "ptjb not found"});

    try {
        await findPtjb.destroy();

        return res.status(200).json({msg: "delete ptjb success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

module.exports = {
    getPtjb,
    getPtjbById,
    createPtjb,
    updatePtjb,
    deletePtjb
}