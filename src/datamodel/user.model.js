const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const user = sequelize.define(
    'users',
    {
        id_user: { primaryKey: true, autoIncrement: true , type: DataTypes.INTEGER},
        login: { type: DataTypes.STRING, allowNull: false },
        mdp: { type: DataTypes.STRING, allowNull: false },
        nom: { type: DataTypes.STRING, allowNull: true },
        prenom: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
       // droit: { type: DataTypes.STRING, allowNull: true },

    },
    { tableName: 'users' },
);
module.exports = user;

