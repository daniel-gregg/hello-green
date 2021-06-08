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

    summary: {
      type: DataTypes.STRING,
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
    },


    image_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'images',
        key: 'id',
      },
    },

    brief_owner_id: {
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
    modelName: 'brief',
  }
);

module.exports = Brief;
