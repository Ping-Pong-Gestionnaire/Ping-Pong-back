const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const poste = sequelize.define(
    'postes',
    {
        id_poste: { primaryKey: true, autoIncrement: true , type: DataTypes.INTEGER},
        nom: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'postes' },
);
module.exports = poste;
