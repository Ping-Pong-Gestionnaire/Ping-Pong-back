const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const gamme = sequelize.define(
    'gammes',
    {
        id_gamme: { primaryKey: true, autoIncrement: true , type: DataTypes.INTEGER },
        libelle: { type: DataTypes.STRING, allowNull: false },
        prix: { type: DataTypes.DECIMAL, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        qte: { type: DataTypes.DECIMAL, allowNull: false },
        id_user: { foreignKey:true, type: DataTypes.INTEGER, allowNull: false },
        id_fourn: { foreignKey:true, type: DataTypes.INTEGER, allowNull: true },

    },
    { tableName: 'gammes' },
);
module.exports = gamme;