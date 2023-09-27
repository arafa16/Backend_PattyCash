const sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const db = new sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT
});

module.exports = db;
