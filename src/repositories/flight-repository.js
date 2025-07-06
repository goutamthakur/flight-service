const { Sequelize } = require("sequelize");

const CrudRepository = require("./crud-repository");
const { flight, airplane, airport, city } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(flight);
  }

  async getAllFlights(filter, sort) {
    const response = await flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: airplane,
          require: true,
          as: "airplaneDetails",
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: airport,
          require: true,
          as: "departureAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          include: {
            model: city,
            require: true,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        },
        {
          model: airport,
          require: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          include: {
            model: city,
            require: true,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return response;
  }
}

module.exports = FlightRepository;
