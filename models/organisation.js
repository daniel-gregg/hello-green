'use strict';
const { Model, DataTypes } = require('sequelize');

class Organisation extends Model {
}

// Remember id, created_date, updated_date columns are created for you.
Organisation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        about: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        image: {
            // path to image/
            type: DataTypes.STRING,
            allowNull: true,
        },

    },
    {
        sequelize,
        modelName: 'organisation',
    }
);

module.exports = Organisation;
