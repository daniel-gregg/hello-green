const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BriefKeyword extends Model { }

BriefKeyword.init(
    {
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
