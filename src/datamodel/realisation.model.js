const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const realisation = sequelize.define(
    'realisations',
    {
        id_realisation: { primaryKey: true, autoIncrement: true , type: DataTypes.INTEGER },

        tempsRea: { type: DataTypes.INTEGER, allowNull: false },
        date: { type: DataTypes.DATEONLY, allowNull: false },

        id_machine: { foreignKey:true, type: DataTypes.INTEGER, allowNull: false },
        id_poste: { foreignKey:true, type: DataTypes.INTEGER, allowNull: false },
        id_operation: { foreignKey:true, type: DataTypes.INTEGER, allowNull: false },
        id_user: { foreignKey:true, type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: 'realisations' },
);
module.exports = realisation;