const Users = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendEmail = async(req, res) => {
    const {email} = req.body;

    const findUser = await Users.findOne({
        where:{
            email:email
        }
    });
    if(!findUser) return res.status(404).json({msg: "email not found"});

    const secret = process.env.SESS_SECRET;

    const token = jwt.sign({id:findUser.uuid},secret,{
        expiresIn: "5m"
    });

    const link = `${process.env.URL_ORIGIN}/reset/${token}`;

     // create reusable transporter object using the default SMTP transport
     const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        }
    });

    const msg = {
        from: '"Support IT Kopkarla" <no-replay@kopkarla.co.id>',
        to: email,
        subject: "Reset Password",
        text: 
        `click this link for reset your password ${link}`
    };

    try {
        await transporter.sendMail(msg);
        return res.status(200).json({msg: "success, check your email for reset password"});
    } catch (error) {
        return res.status(500).json({msg: error});
    }

}

const verifyToken = async(req, res) => {
    const {token} = req.params;

    const secret = process.env.SESS_SECRET;

    try {
        const verify = jwt.verify(token, secret);

        const findUser = await Users.findOne({
            where:{
                uuid: verify.id
            }
        })

        if(!findUser) return res.status(404).json({msg: "user not found"});

        res.status(200).json(findUser);
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

module.exports = {
    sendEmail,
    verifyToken
}