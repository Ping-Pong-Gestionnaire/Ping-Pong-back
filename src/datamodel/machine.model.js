const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const machine = sequelize.define(
    'machines',
    {
        id_machine: { primaryKey: true, autoIncrement: true , type: DataTypes.INTEGER },
        nom: { type: DataTypes.STRING, allowNull: false },
        id_poste: { foreignKey:true, type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: 'machines' },
);
module.exports = machine;