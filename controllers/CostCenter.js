const CostCenter = require('../models/CostCenterModel.js');

const getCostCenters = async(req, res) => {
    try {
        const response = await CostCenter.findAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getCostCentersPage = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);

    const offset = (page - 1) * limit;

    try {
        const response = await CostCenter.findAndCountAll({
                limit:limit,
                offset:offset
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getCostCentersPageByStatus = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const status = parseInt(req.params.status);

    const offset = (page - 1) * limit;

    try {
        const response = await CostCenter.findAndCountAll({
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

const getCostCenterById = async(req, res) => {
    try {
        const response = await CostCenter.findOne({
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const createCostCenter = async(req, res) => {
    const {name, code, isActive} = req.body;

    try {
        await CostCenter.create({
            name:name,
            code:code,
            isActive:isActive
        });

        return res.status(200).json({msg: "create cost center success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const updateCostCenter = async(req, res) => {
    const {name, code, isActive} = req.body;
    const findCostCenter = await CostCenter.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findCostCenter) return res.status(404).json({msg: "not found"});

    try {
        await findCostCenter.update({
            name:name,
            code:code,
            isActive:isActive
        });

        return res.status(200).json({msg: "update cost center success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const deleteCostCenter = async(req, res) => {

    const findCostCenter = await CostCenter.findOne({
        where:{
            uuid:req.params.id
        }
    });

    if(!findCostCenter) return res.status(404).json({msg: "not found"});

    try {
        await findCostCenter.destroy();

        return res.status(200).json({msg: "delete cost center success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

module.exports = {
    getCostCenters,
    getCostCenterById,
    createCostCenter,
    updateCostCenter,
    deleteCostCenter,
    getCostCentersPage,
    getCostCentersPageByStatus
}