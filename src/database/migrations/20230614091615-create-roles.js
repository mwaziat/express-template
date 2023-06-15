"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        field: "name",
        allowNull: false,
        type: Sequelize.STRING,
      },
      slug: {
        field: "slug",
        allowNull: true,
        type: Sequelize.STRING,
      },
      description: {
        field: "description",
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        field: "status",
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("roles");
  },
};
