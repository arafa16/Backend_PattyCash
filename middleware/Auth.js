const Users = require('../models/UserModel.js');

const verifyUser = async(req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }

    const user = await Users.findOne({
        where:{
            uuid:req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "access denied"});
    req.userId = user.uuid;
    next();
}

module.exports = {
    verifyUser
}