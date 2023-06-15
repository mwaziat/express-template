"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Features extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Features.hasOne(models.UserFeature, { foreignKey: "featureId" });
    }
  }
  Features.init(
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
        allowNull: false,
        type: DataTypes.STRING,
      },
      code: {
        field: "code",
        allowNull: false,
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
      deletedAt: {
        field: "deleted_at",
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Features",
      tableName: "features",
      paranoid: true,
    }
  );
  return Features;
};
