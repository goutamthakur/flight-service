"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("airplanes", [
      {
        modelNumber: "Boeing 707",
        capacity: 219,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "Boeing 727",
        capacity: 189,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "Boeing 737",
        capacity: 215,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "Boeing 747",
        capacity: 524,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("airplanes", {
      [Op.or]: [
        { modelNumber: "Boeing 707" },
        { modelNumber: "Boeing 727" },
        { modelNumber: "Boeing 737" },
        { modelNumber: "Boeing 747" },
      ],
    });
  },
};
