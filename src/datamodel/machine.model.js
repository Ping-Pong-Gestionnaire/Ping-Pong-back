const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const machine = sequelize.define(
    'machines',
    {
        id_machine: { primaryKey: true, type: DataTypes.STRING },
        nom: { type: DataTypes.STRING, allowNull: false },
        id_poste: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'machines' },
);
module.exports = machine;