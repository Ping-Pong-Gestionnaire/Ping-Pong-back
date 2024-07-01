const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const fournisseur = sequelize.define(
    'fournisseurs',
    {
        id_fourn: { primaryKey: true, autoIncrement: true , type: DataTypes.INTEGER },
        nom: { type: DataTypes.STRING, allowNull: false },
        tel: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true }
    },
    { tableName: 'fournisseurs' },
);
module.exports = fournisseur;