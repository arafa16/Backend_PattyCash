const Pengajuan = require("../models/PengajuanModel.js");
const Status = require("../models/StatusModel.js");

const getStatus = async(req, res) => {
    try {
        const response = await Status.findAll({
            include:{
                model:Pengajuan
            },
            order:[
                ['id', 'ASC']
            ]
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getStatusById = async(req, res) => {
    try {
        const response = await Status.findOne({
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const createStatus = async(req, res) => {
    const {name, code} = req.body;
    try {
        await Status.create({
            name:name,
            code:code
        });

        return res.status(201).json({msg: "create success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const updateStatus = async(req, res) => {
    const {name, code} = req.body;

    const findStatus = await Status.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findStatus) return res.status(404).json({msg: "status not found"});

    try {
        await findStatus.update({
            name:name,
            code:code
        });

        return res.status(201).json({msg: "update success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const deleteStatus = async(req, res) => {
    const findStatus = await Status.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findStatus) return res.status(404).json({msg: "status not found"});

    try {
        await findStatus.destroy();

        return res.status(200).json({msg: "delete success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

module.exports = {
    getStatus,
    getStatusById,
    createStatus,
    updateStatus,
    deleteStatus
}