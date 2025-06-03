const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");

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

async function getAllFlights(query) {
  try {
    //?trips=BOM-DEL
    let customFilter = {};
    let sortFilter = [];
    if (query.trips) {
      [departureAirportId, arrivalAirportId] = query.trips.split("-");
      if (departureAirportId === arrivalAirportId) {
        throw new AppError(
          "Departure airport and arrival airport cannot be same",
          StatusCodes.BAD_REQUEST
        );
      }
      customFilter.departureAirportId = departureAirportId;
      customFilter.arrivalAirportId = arrivalAirportId;
    }
    if (query.price) {
      [minPrice, maxPrice] = query.price.split("-");
      customFilter.price = {
        [Op.between]: [minPrice, maxPrice === undefined ? 200000 : maxPrice],
      };
    }
    if (query.travellers) {
      customFilter.totalSeats = {
        [Op.gte]: query.travellers,
      };
    }
    if (query.tripDate) {
      const date = new Date(query.tripDate);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      customFilter.departureTime = {
        [Op.gte]: date,
        [Op.lt]: nextDay,
      };
    }
    if (query.sort) {
      let params = query.sort.split(",");
      const sortFilters = params.map((param) => param.split("_"));
      sortFilter = sortFilters;
    }
    const flights = flightRepository.getAllFlights(customFilter, sortFilter);
    return flights;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      "Something went wrong while getting the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
