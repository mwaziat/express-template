"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Roles.hasMany(models.UserRoles, { foreignKey: "roleId", });
      Roles.hasOne(models.UserRoles, { foreignKey: "roleId" });
    }
  }
  Roles.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        field: "name",
        allowNull: false,
        type: DataTypes.STRING,
      },
      slug: {
        field: "slug",
        allowNull: true,
        type: DataTypes.STRING,
      },
      description: {
        field: "description",
        allowNull: true,
        type: DataTypes.STRING,
      },
      status: {
        field: "status",
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Roles",
      tableName: "roles",
      timestamps: true,
    }
  );
  return Roles;
};
