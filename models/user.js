'use strict';
const bcrypt = require('bcryptjs');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

// Remember id, created_date, updated_date columns are created for you.
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull:true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Hooks are automatic methods that run during various phases of the User Model lifecycle
        // In this case, before a User is created/updated, we will automatically hash their password
        hooks: {
            beforeCreate(user) {
                user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
                return user;
            },
            beforeUpdate(user) {
                if (user.password) {
                    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
                }
                return user;
            },
        },
        sequelize,
        modelName: 'user',
    }
);

module.exports = User;
