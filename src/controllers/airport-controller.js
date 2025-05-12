const { StatusCodes } = require("http-status-codes");

const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirport(req, res) {
  try {
    const airport = await AirportService.createAirport({
      name: req.body?.name,
      code: req.body?.code,
      address: req.body?.address,
      cityId: req.body?.cityId,
    });
    SuccessResponse.message = "Successfully created airport";
    SuccessResponse.data = airport;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirport(req, res) {
  try {
    const airport = await AirportService.getAirport(req.params?.id);
    SuccessResponse.message = "Successfully fetched a airport";
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await AirportService.getAirports();
    SuccessResponse.message = "Successfully fetched all airports";
    SuccessResponse.data = airports;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirport(req, res) {
  try {
    const airport = await AirportService.updateAirport(
      req.params?.id,
      req.body
    );
    SuccessResponse.message = "Successfully updated the airport";
    SuccessResponse.data = airport;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteAirport(req, res) {
  try {
    const response = await AirportService.deleteAirport(req.params?.id);
    SuccessResponse.message = "Successfully deleted the airport";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirport,
  getAirport,
  getAirports,
  updateAirport,
  deleteAirport,
};
