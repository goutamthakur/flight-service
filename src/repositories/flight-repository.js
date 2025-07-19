const { Sequelize } = require("sequelize");
const { StatusCodes } = require("http-status-codes");

const CrudRepository = require("./crud-repository");
const { flight, airplane, airport, city } = require("../models");
const { AppError } = require("../utils");
const db = require("../models");

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

  async updateSeats(flightId, seats, dec) {
    // Row Level Lock for updating seats inside a transaction
    const t = await db.sequelize.transaction();
    try {
      const updateFlight = await flight.findOne({
        where: {
          id: flightId,
        },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      if (!updateFlight) {
        throw new AppError(
          "Flight not found for given id",
          StatusCodes.NOT_FOUND
        );
      }
      if (dec) {
        await updateFlight.decrement("totalSeats", {
          by: seats,
          transaction: t,
        });
      } else {
        await updateFlight.increment("totalSeats", {
          by: seats,
          transaction: t,
        });
      }
      await updateFlight.reload({ transaction: t });
      await t.commit();
      return updateFlight;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
