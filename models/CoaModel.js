const sequelize = require('sequelize');
const db = require('../config/Database.js');

const {DataTypes} = sequelize;

const Coa = db.define('coa',{
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

module.exports = Coa;