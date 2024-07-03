const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const listeMachinePosteModel = sequelize.define(
    'listeMachinesPostes',
    {

    },
    { tableName: 'listeMachinesPostes' },
);
module.exports = listeMachinePosteModel;