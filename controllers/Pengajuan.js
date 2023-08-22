const Pengajuan = require("../models/PengajuanModel.js");

const getPengajuans = async(req, res) => {
    try {
        const response = await Pengajuan.findAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getPengajuanById = async(req, res) => {
    try {
        const response = await Pengajuan.findOne({
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const createPengajuan = async(req, res) => {
    const {tanggal, expense, advance, coa, costCenter, analiticAccount, debit, credit, typePengajuanId, userId, statusId} = req.body;

    try {
        await Pengajuan.create({
            tanggal:tanggal,
            expense:expense,
            advance:advance,
            coa:coa,
            costCenter:costCenter,
            analiticAccount:analiticAccount,
            debit:debit,
            credit:credit,
            typePengajuanId:typePengajuanId,
            userId:userId,
            statusId:statusId
        });

        return res.status(200).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const updatePengajuan = async(req, res) => {
    const {tanggal, expense, advance, coa, costCenter, analiticAccount, debit, credit, typePengajuanId, userId, statusId} = req.body;

    const findPengajuan = await Pengajuan.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findPengajuan) return res.status(404).json({msg: "not found"});

    try {
        await findPengajuan.update({
            tanggal:tanggal,
            expense:expense,
            advance:advance,
            coa:coa,
            costCenter:costCenter,
            analiticAccount:analiticAccount,
            debit:debit,
            credit:credit,
            typePengajuanId:typePengajuanId,
            userId:userId,
            statusId:statusId
        });

        return res.status(200).json({msg: "success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const deletePengajuan = async(req, res) => {
    const findPengajuan = await Pengajuan.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findPengajuan) return res.status(404).json({msg: "not found"});

    try {
        await findPengajuan.destroy();

        return res.status(200).json({msg: "delete success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}


module.exports = {
    getPengajuans,
    getPengajuanById,
    createPengajuan,
    updatePengajuan,
    deletePengajuan
}