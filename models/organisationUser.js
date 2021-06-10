const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OrganisationUser extends Model {}

OrganisationUser.init(
    {
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'organisation_user',
    }
);

module.exports = OrganisationUser;
