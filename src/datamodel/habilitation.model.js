const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const habilitation = sequelize.define(
    'habilitations',
    {

    },
    { tableName: 'habilitations' },
);
module.exports = habilitation;