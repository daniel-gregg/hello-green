const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class BriefKeyword extends Model {}

BriefKeyword.init(
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

        keyword_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'keyword',
                key: 'id',
            },
        },
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'brief_keyword',
    }
);

module.exports = BriefKeyword;
