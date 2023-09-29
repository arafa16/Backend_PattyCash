const Pengajuan = require('../models/PengajuanModel.js');
const TypePengajuan = require('../models/TypePengajuanModel.js');

const getTypePengajuans = async(req, res) => {
    try {
        const response = await TypePengajuan.findAll({
            include:{
                model:Pengajuan
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getTypePengajuanPage = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);

    const offset = (page - 1) * limit;

    try {
        const response = await TypePengajuan.findAndCountAll({
            limit:limit,
            offset:offset
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getTypePengajuanPageByStatus = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const status = parseInt(req.params.status);

    const offset = (page - 1) * limit;
    
    try {
        const response = await TypePengajuan.findAndCountAll({
            limit:limit,
            offset:offset,
            where:{
                isActive:status
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getTypePengajuanById = async(req, res) => {
    try {
        const response = await TypePengajuan.findOne({
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const createTypePengajuan = async(req, res) => {
    const {name, code, isActive} = req.body;
    try {
        const typePengajuan = await TypePengajuan.create({
            name:name,
            code:code,
            isActive:isActive
        });

        return res.status(201).json({msg: "create type success"})
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const updateTypePengajuan = async(req, res) => {
    const {name, code, isActive} = req.body;
    const findType = await TypePengajuan.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findType) return res.status(404).json({msg: "not found"});

    try {
        await findType.update({
            name:name,
            code:code,
            isActive:isActive
        });

        return res.status(200).json({msg: "update success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const deleteTypePengajuan = async(req, res) => {
    const findType = await TypePengajuan.findOne();

    if(!findType) return res.status(404).json({msg: "not found"});

    try {
        await findType.destroy();

        return res.status(200).json({msg: "delete success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

module.exports = {
    getTypePengajuans,
    getTypePengajuanById,
    createTypePengajuan,
    updateTypePengajuan,
    deleteTypePengajuan,
    getTypePengajuanPage,
    getTypePengajuanPageByStatus
}