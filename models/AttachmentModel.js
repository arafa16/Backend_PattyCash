const sequelize = require('sequelize');
const db = require('../config/Database.js');
const Pengajuan = require('./PengajuanModel.js');

const {DataTypes} = sequelize;

const Attachment = db.define('attachment',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    pengajuanId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    displayName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fileName: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    link: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
});

Pengajuan.hasMany(Attachment);
Attachment.belongsTo(Pengajuan, {foreignKey: 'pengajuanId'});

module.exports = Attachment;