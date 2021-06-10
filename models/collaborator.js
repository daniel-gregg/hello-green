'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Collaborator extends Model { }

Collaborator.init(
    {},
    {
        sequelize,
        model: 'Collaborator',
        timestamps: false,
    }
);

module.exports = Collaborator;
