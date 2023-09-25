const sequelize = require('sequelize');
const db = require('../config/Database.js');
const User = require('./UserModel.js');
const TypePengajuan = require('./TypePengajuanModel.js');
const Status = require('./StatusModel.js');
const Coa = require('./CoaModel.js');
const CostCenter = require('./CostCenterModel.js');
const AnnalitictAccout = require('./AnnaliticAccountModel.js');

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
        type: DataTypes.STRING,
        allowNull: true
    },
    advance:{
        type: DataTypes.STRING,
        allowNull:true
    },
    coaId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    costCenterId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    annaliticAccountId:{
        type: DataTypes.INTEGER,
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
    reference:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    keterangan:{
        type: DataTypes.TEXT,
        allowNull:true
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

Coa.hasMany(Pengajuan);
Pengajuan.belongsTo(Coa, {foreignKey: 'coaId'});

CostCenter.hasMany(Pengajuan);
Pengajuan.belongsTo(CostCenter, {foreignKey: 'costCenterId'});

AnnalitictAccout.hasMany(Pengajuan);
Pengajuan.belongsTo(AnnalitictAccout, {foreignKey: 'annaliticAccountId'});

module.exports = Pengajuan;