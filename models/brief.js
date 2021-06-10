const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Brief extends Model { }


Brief.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        //shortSummary <75 words

        summary: {
            type: DataTypes.STRING, // < 200 words
        },

        content: {
            type: DataTypes.JSON,
            allowNull: true,
        },

        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        date_last_edited: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'brief',
    }
);

module.exports = Brief;
