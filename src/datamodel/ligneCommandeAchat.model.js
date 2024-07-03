const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const ligneCommandeAchat = sequelize.define(
    'lignescommandesA',
    {
        id_ligne: { primaryKey: true, autoIncrement: true , type: DataTypes.INTEGER },
        libelle: { type: DataTypes.STRING, allowNull: false },
        qte: { type: DataTypes.DECIMAL, allowNull: false },
        prix: { type: DataTypes.DECIMAL, allowNull: false },
        prix_unitaire: { type: DataTypes.DECIMAL, allowNull: true },

        id_commande: { foreignKey:true, type: DataTypes.INTEGER, allowNull: true },
        id_gamme: { foreignKey:true, type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: 'lignescommandesA' },
);
module.exports = ligneCommandeAchat;