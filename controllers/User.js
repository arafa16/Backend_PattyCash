const argon = require('argon2');
const Users = require("../models/UserModel.js");
const { Op } = require('sequelize');

const getUsers = async(req, res) =>{
    try {
        const response = await Users.findAll();

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getUsersPage = async(req, res) =>{
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);

    const offset = (page - 1) * limit;

    console.log('sampai di page search');

    try {
        const response = await Users.findAndCountAll({
            limit:limit,
            offset:offset
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const getUsersPageStatus = async(req, res) =>{
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const status = req.params.status;

    const offset = (page - 1) * limit;

    console.log(status, 'sampai di page status');

    try {
        const response = await Users.findAndCountAll({
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

const getUserById = async(req, res) =>{
    try {
        const response = await Users.findOne({
            where:{
                uuid:req.params.id
            }
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const createUser = async(req, res) => {
    const {name, email, password} = req.body;
    const hasPassword = await argon.hash(password);
    try {
        await Users.create({
            name:name,
            email:email,
            password:hasPassword
        });

        return res.status(201).json({msg: "creat success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const createUserFromAdmin = async(req, res) => {
    const {name, email, password, isAdmin, isActive} = req.body;
    const hasPassword = await argon.hash(password);
    try {
        await Users.create({
            name:name,
            email:email,
            password:hasPassword,
            isAdmin:isAdmin,
            isActive:isActive
        });

        return res.status(201).json({msg: "creat success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

const updateUser = async(req, res) => {
    const {
        name, 
        email, 
        isActive,
        isAdmin
    } = req.body;

    // const hasPassword = await argon.hash(password);

    try {
        const findUser = await Users.findOne({
            where:{
                uuid:req.params.id
            }
        });

        if(!findUser) return res.status(404).json({msg: "user not found"});

        await findUser.update({
            name:name,
            email:email,
            isActive:isActive,
            isAdmin:isAdmin
            // password:hasPassword
        })
        
        res.status(201).json({msg: "update success"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const updatePassword = async(req, res) => {
    const {
        password
    } = req.body;

    const hasPassword = await argon.hash(password);

    try {
        const findUser = await Users.findOne({
            where:{
                uuid:req.params.id
            }
        });

        if(!findUser) return res.status(404).json({msg: "user not found"});

        await findUser.update({
            password:hasPassword
        })
        
        res.status(201).json({msg: "update password success"});
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

const deleteUser = async(req, res) =>{
    try {
        const findUser = await Users.findOne({
            where:{
                uuid:req.params.id
            }
        });

        if(!findUser) return res.status(404).json({msg: "user not found"});

        await findUser.destroy();
        
        res.status(200).json({msg: "delete success"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }
}

module.exports = {
    getUsers,
    getUsersPage,
    getUsersPageStatus,
    getUserById,
    createUser,
    createUserFromAdmin,
    updateUser,
    updatePassword,
    deleteUser
}