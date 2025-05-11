"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("airports", {
      fields: ["cityId"],
      type: "foreign key",
      name: "fk_airports_cities",
      references: {
        table: "cities",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("airports", "fk_airports_cities");
  },
};
