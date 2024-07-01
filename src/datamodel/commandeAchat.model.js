const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const commandeAchat = sequelize.define(
    'commandesA',
    {
        id_commande: { primaryKey: true, autoIncrement: true , type: DataTypes.INTEGER },
        statut: { type: DataTypes.STRING, allowNull: false },
        dateLivPrev: { type: DataTypes.DATEONLY, allowNull: false },
        dateLivReel: { type: DataTypes.DATEONLY, allowNull: true },

        id_fourn: { foreignKey:true, type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: 'commandesA' },
);
module.exports = commandeAchat;