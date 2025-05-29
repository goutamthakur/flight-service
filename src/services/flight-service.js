const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    throw new AppError(
      "Something went wrong while creating the flight",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
};
