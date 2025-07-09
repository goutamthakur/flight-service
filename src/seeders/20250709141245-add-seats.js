"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const seats = [];
    const airplaneId = 1;
    const rows = 10;
    const columns = ["A", "B", "C", "D", "E", "F"];
    const timestamp = new Date();

    for (let row = 1; row <= rows; row++) {
      for (const col of columns) {
        seats.push({
          airplaneId,
          row,
          column: col,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
      }
    }

    await queryInterface.bulkInsert("seats", seats);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("seats", {
      airplaneId: 1,
    });
  },
};
