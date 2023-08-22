const sequelize = require('sequelize');
const db = require('../config/Database.js');
const User = require('./UserModel.js');
const TypePengajuan = require('./TypePengajuanModel.js');
const Status = require('./StatusModel.js');

const {DataTypes} = sequelize;

const Pengajuan = db.define('pengajuan',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    tanggal:{
        type: DataTypes.DATE,
        allowNull: false
    },
    expense: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    advance:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    coa:{
        type: DataTypes.STRING,
        allowNull:false
    },
    costCenter:{
        type: DataTypes.STRING,
        allowNull:false
    },
    analiticAccount:{
        type: DataTypes.STRING,
        allowNull:false
    },
    debit:{
        type: DataTypes.DECIMAL(30),
        allowNull:false
    },
    credit:{
        type: DataTypes.DECIMAL(30),
        allowNull:false
    },
    typePengajuanId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    statusId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
});

User.hasMany(Pengajuan);
Pengajuan.belongsTo(User, {foreignKey: 'userId'});

TypePengajuan.hasMany(Pengajuan);
Pengajuan.belongsTo(TypePengajuan, {foreignKey: 'typePengajuanId'});

Status.hasMany(Pengajuan);
Pengajuan.belongsTo(Status, {foreignKey: 'statusId'});

module.exports = Pengajuan;