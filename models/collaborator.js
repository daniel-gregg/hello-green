'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collaborator extends Model {}

Collaborator.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        brief_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'brief',
                key: 'id',
            },
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'collaborator',
    }
);

module.exports = Collaborator;
