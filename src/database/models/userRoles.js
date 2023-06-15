"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserRoles.belongsTo(models.Users, { foreignKey: "id" });
      UserRoles.belongsTo(models.Roles, { foreignKey: "roleId" });
    }
  }
  UserRoles.init(
    {
      userId: DataTypes.BIGINT,
      roleId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "UserRoles",
      tableName: "user_roles",
      timestamps: false,
    }
  );
  return UserRoles;
};
