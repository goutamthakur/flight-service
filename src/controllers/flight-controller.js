const { StatusCodes } = require("http-status-codes");

const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createFlight(req, res) {
  try {
    const flight = await FlightService.createFlight({
      flightNumber: req.body.flightNumber,
      airplaneId: req.body.airplaneId,
      departureAirportId: req.body.departureAirportId,
      arrivalAirportId: req.body.arrivalAirportId,
      departureTime: req.body.departureTime,
      arrivalTime: req.body.arrivalTime,
      boardingGate: req.body?.boardingGate,
      price: req.body.price,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.message = "Successfully created a flight";
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlight,
};
