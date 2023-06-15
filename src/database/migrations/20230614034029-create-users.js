"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      firstName: {
        field: "first_name",
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        field: "last_name",
        allowNull: true,
        type: Sequelize.STRING,
      },
      name: {
        field: "name",
        allowNull: true,
        type: Sequelize.STRING,
      },
      email: {
        field: "email",
        allowNull: false,
        type: Sequelize.STRING,
      },
      username: {
        field: "username",
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        field: "password",
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: true,
        field: "phone",
        type: Sequelize.STRING,
      },
      address: {
        allowNull: true,
        field: "address",
        type: Sequelize.STRING,
      },
      emailVerified: {
        allowNull: true,
        field: "email_verified",
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        field: "deleted_at",
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
