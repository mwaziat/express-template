"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserFeature.belongsTo(models.Users, { foreignKey: "id" });
      UserFeature.belongsTo(models.Features, { foreignKey: "featureId" });
    }
  }
  UserFeature.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        field: "user_id",
        type: DataTypes.BIGINT,
      },
      featureId: {
        field: "feature_id",
        type: DataTypes.BIGINT,
      },
    },
    {
      sequelize,
      modelName: "UserFeature",
      tableName: "user_features",
      timestamps: false,
    }
  );
  return UserFeature;
};
