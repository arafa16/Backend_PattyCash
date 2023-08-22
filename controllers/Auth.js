const Users = require("../models/UserModel.js");
const argon = require("argon2");

const Login = async(req, res) => {
    const {email, password} = req.body;

    const findUser = await Users.findOne({
        where:{
            email:email
        }
    });

    if(!findUser) return res.status(404).json({msg: "email not found"});

    const match = await argon.verify(findUser.password, password);

    if(!match) return res.status(401).json({msg: "wrong password"});

    req.session.userId = findUser.uuid;

    const uuid = findUser.uuid;
    const name = findUser.name;

    return res.status(200).json({uuid, name, email, msg: "success"});
}

const getMe = async(req, res) => {
    if(!req.session.userId) return res.status(401).json({msg: "Access Denied"});

    const user = await Users.findOne({
        uuid:req.session.userId
    });

    if(!user) return res.status(401).json({msg: "Access Denied"});

    return res.status(200).json(user);
}

const Logout = async(req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: err.message});

        return res.status(200).json({msg: "Logout success"});
    })
}



module.exports = {
    Login,
    getMe,
    Logout
}