const TypePengajuan = require('../models/TypePengajuanModel.js');

const getTypePengajuans = async(req, res) => {
    try {
        const response = await TypePengajuan.findAll();

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
    const {name, code} = req.body;
    try {
        const typePengajuan = await TypePengajuan.create({
            name:name,
            code:code
        });

        return res.status(201).json({msg: "create type success"})
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const updateTypePengajuan = async(req, res) => {
    const {name, code} = req.body;
    const findType = await TypePengajuan.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findType) return res.status(404).json({msg: "not found"});

    try {
        await findType.update({
            name:name,
            code:code
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
    deleteTypePengajuan
}