const sequelize = require('sequelize');
const db = require('../config/Database.js');

const {DataTypes} = sequelize;

const TypePengajuan = db.define('type_pengajuan',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
});

module.exports = TypePengajuan;