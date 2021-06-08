'use strict';
const { Model, DataTypes } = require('sequelize');

class Image extends Model {
}

// Remember id, created_date, updated_date columns are created for you.
Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        description: {
            //  the alt desciption for images
            type: DataTypes.STRING,
        },

        about: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        path: {
            // path to image/
            type: DataTypes.STRING,
            allowNull: true,
        },

    },
    {
        sequelize,
        modelName: 'image',
    }
);

module.exports = Image;
