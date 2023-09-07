const sequelize = require('sequelize');

const db = new sequelize('db_keuangan','root','',{
    host:'localhost',
    dialect: 'mysql'
});

module.exports = db;

//uji coba git ke server
