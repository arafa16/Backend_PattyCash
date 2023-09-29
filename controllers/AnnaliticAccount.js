const AnnalitictAccout = require('../models/AnnaliticAccountModel');

const getAnnaliticAccounts = async(req, res) => {
    try {
        const response = await AnnalitictAccout.findAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getAnnaliticAccountsPage = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const status = parseInt(req.params.status);

    const offset = (page - 1) * limit;

    try {
        const response = await AnnalitictAccout.findAndCountAll({
            limit:limit,
            offset:offset
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getAnnaliticAccountsPageByStatus = async(req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const status = parseInt(req.params.status);

    const offset = (page - 1) * limit;

    try {
        const response = await AnnalitictAccout.findAndCountAll({
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

const getAnnaliticAccountById = async(req, res) => {
    try {
        const response = await AnnalitictAccout.findOne({
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const createAnnaliticAccount = async(req, res) => {
    const {name, code, isActive} = req.body;

    try {
        await AnnalitictAccout.create({
            name:name,
            code:code,
            isActive:isActive
        });

        return res.status(200).json({msg: "create annalitic account success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const updateAnnaliticAccount = async(req, res) => {
    const {name, code, isActive} = req.body;

    const findAnnaliticAccount = await AnnalitictAccout.findOne({
        where:{
            uuid:req.params.id
        }
    })

    if(!findAnnaliticAccount) return res.status(404).json({msg: "not found"});

    try {
        await findAnnaliticAccount.update({
            name:name,
            code:code,
            isActive:isActive
        });

        return res.status(200).json({msg: "update annalitic account success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const deleteAnnaliticAccount = async(req, res) => {

    const findAnnaliticAccount = await AnnalitictAccout.findOne({
        where:{
            uuid:req.params.id
        }
    })

    if(!findAnnaliticAccount) return res.status(404).json({msg: "not found"});

    try {
        await findAnnaliticAccount.destroy();

        return res.status(200).json({msg: "delete annalitic account success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

module.exports = {
    getAnnaliticAccounts,
    createAnnaliticAccount,
    getAnnaliticAccountById,
    updateAnnaliticAccount,
    deleteAnnaliticAccount,
    getAnnaliticAccountsPage,
    getAnnaliticAccountsPageByStatus
}