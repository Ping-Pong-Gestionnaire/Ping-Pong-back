const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const operation = sequelize.define(
    'operations',
    {
        id_operation: { primaryKey: true, autoIncrement: true , type: DataTypes.INTEGER },
        libelle: { type: DataTypes.STRING, allowNull: false },
        tempsRea: { type: DataTypes.INTEGER, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },

        id_machine: { foreignKey:true, type: DataTypes.INTEGER, allowNull: false },
        id_poste: { foreignKey:true, type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: 'operations' },
);
module.exports = operation;