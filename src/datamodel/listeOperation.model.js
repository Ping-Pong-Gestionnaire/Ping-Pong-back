const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const listeOperationModel = sequelize.define(
    'listeOperations',
    {

    },
    { tableName: 'listeOperations' },
);
module.exports = listeOperationModel;