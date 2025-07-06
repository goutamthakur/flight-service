"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.airplane, {
        foreignKey: "airplaneId",
        as: "airplaneDetails",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.airport, {
        foreignKey: "departureAirportId",
        as: "departureAirport",
        onDelete: "CASCADE",
      });

      this.belongsTo(models.airport, {
        foreignKey: "arrivalAirportId",
        as: "arrivalAirport",
        onDelete: "CASCADE",
      });
    }
  }
  flight.init(
    {
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          table: "airplanes",
          field: "id",
        },
        onDelete: "cascade",
      },
      departureAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          table: "airports",
          field: "code",
        },
        onDelete: "cascade",
      },
      arrivalAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          table: "airports",
          field: "code",
        },
        onDelete: "cascade",
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      boardingGate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "flight",
    }
  );
  return flight;
};
