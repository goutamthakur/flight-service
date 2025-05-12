const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const { AirportRepository } = require("../repositories");

const airportRepository = new AirportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepository.create(data);
    return airport;
  } catch (error) {
    throw new AppError(
      "Something went wrong while creating the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepository.get(id);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Unable to find the request airport",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong while fetching the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirports() {
  try {
    const airports = await airportRepository.getAll();
    return airports;
  } catch (error) {
    throw new AppError(
      "Something went wrong while fetching the airports",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirport(id, data) {
  try {
    const airport = await airportRepository.update(id, data);
    return airport;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Unable to find the request airport to update",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong while updating the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirport(id) {
  try {
    const response = await airportRepository.destroy({ id });
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The requested airport to delete is not found",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong while deleting the airport",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirport,
  getAirport,
  getAirports,
  updateAirport,
  deleteAirport,
};
