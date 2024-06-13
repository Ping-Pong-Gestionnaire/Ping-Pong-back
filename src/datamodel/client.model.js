const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const clients = sequelize.define(
    'clients',
    {
        id_client: { primaryKey: true, type: DataTypes.STRING },
        nom: { type: DataTypes.STRING, allowNull: false },
        prenom: { type: DataTypes.STRING, allowNull: false },
        telephone: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        adresse: { type: DataTypes.STRING, allowNull: true },

    },
    { tableName: 'clients' },
);
module.exports = clients;