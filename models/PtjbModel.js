const sequelize = require('sequelize');
const db = require('../config/Database.js');
const Pengajuan = require('./PengajuanModel.js');

const {DataTypes} = sequelize;

const Ptjb = db.define('ptjb',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    nominal: {
        type: DataTypes.DECIMAL(30),
        allowNull: false
    },
    keterangan:{
        type: DataTypes.STRING,
        allowNull:false
    },
    pengajuanId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
});

Pengajuan.hasMany(Ptjb);
Ptjb.belongsTo(Pengajuan, {foreignKey: 'pengajuanId'});

module.exports = Ptjb;

