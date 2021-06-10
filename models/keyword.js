'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Keyword extends Model {}

// Remember id, created_date, updated_date columns are created for you.
Keyword.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        keyword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'keyword',
    }
);

module.exports = Keyword;
