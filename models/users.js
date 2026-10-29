'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.Posts, {
        foreignKey: 'postId',
        as: 'Article',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Users.init({
     id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: true
  });
  return Users;
};