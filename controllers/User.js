const argon = require('argon2');
const Users = require("../models/UserModel.js");

const getUsers = async(req, res) =>{
    try {
        const response = await Users.findAll();

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

const updateUser = async(req, res) => {
    const {name, email, password} = req.body;
    const hasPassword = await argon.hash(password);
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
            password:hasPassword
        })
        
        res.status(201).json({msg: "update success"});
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
    getUserById,
    createUser,
    updateUser,
    deleteUser
}