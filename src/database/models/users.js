"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.UserRoles, { foreignKey: "userId" });
      Users.hasMany(models.UserFeature, { foreignKey: "userId" });
    }
  }
  Users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      firstName: {
        field: "first_name",
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        field: "last_name",
        allowNull: true,
        type: DataTypes.STRING,
      },
      name: {
        field: "name",
        allowNull: true,
        type: DataTypes.STRING,
      },
      email: {
        field: "email",
        allowNull: false,
        type: DataTypes.STRING,
      },
      username: {
        field: "username",
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        field: "password",
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: true,
        field: "phone",
        type: DataTypes.STRING,
      },
      address: {
        allowNull: true,
        field: "address",
        type: DataTypes.STRING,
      },
      emailVerified: {
        allowNull: true,
        field: "email_verified",
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        field: "deleted_at",
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
    }
  );
  return Users;
};
