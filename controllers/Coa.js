const Coa = require("../models/CoaModel.js");

const getCoa = async(req, res) => {
    try {
        const response = await Coa.findAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error})
    }
}

const getCoaById = async(req, res) => {
    try {
        const response = await Coa.findOne({
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error})
    }
}

const updateCoa = async(req, res) => {
    const {name, code, isActive} = req.body;

    const findCoa = await Coa.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findCoa) return res.status(404).json({msg: "not found"});

    try {
        await findCoa.update({
            name:name,
            code:code,
            isActive:isActive
        });

        return res.status(200).json({msg: "update coa successed"});
    } catch (error) {
        return res.status(500).json({msg: error})
    }
}

const createCoa = async(req, res) => {
    const {name, code, isActive} = req.body;
    try {
        await Coa.create({
            name:name,
            code:code,
            isActive:isActive
        });

        return res.status(201).json({msg: "create coa successed"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const deleteCoa = async(req, res) => {
    const {id} = req.params;

    try {
        await Coa.destroy({
            where:{
                uuid:id
            }
        });

        return res.status(200).json({msg: "delete coa successed"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

module.exports = {
    getCoa,
    getCoaById,
    createCoa,
    updateCoa,
    deleteCoa
}