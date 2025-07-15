const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");

const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/datetime-helpers");

function validateCreateRequest(req, res, next) {
  const requiredFields = [
    "flightNumber",
    "airplaneId",
    "departureAirportId",
    "arrivalAirportId",
    "departureTime",
    "arrivalTime",
    "price",
    "totalSeats",
  ];

  const missingFields = requiredFields.filter((field) => !req.body?.[field]);

  if (missingFields.length > 0) {
    ErrorResponse.message = "Something when wrong while creating airplane";
    ErrorResponse.error = new AppError(
      `${missingFields.join(", ")} not found in the incoming request`,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  const compareFlightTime = compareTime(
    req.body?.departureTime,
    req.body?.arrivalTime
  );
  if (compareFlightTime) {
    ErrorResponse.message = "Something when wrong while creating flight";
    ErrorResponse.error = new AppError(
      "Departure time cannot be after arrival time.",
      StatusCodes.BAD_REQUEST
    );
    res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateSeats(req, res, next) {
  if (!req?.body?.seats) {
    ErrorResponse.message = "Something when wrong while updating flight";
    ErrorResponse.error = new AppError(
      `seats not found in the incoming request`,
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateSeats,
};
