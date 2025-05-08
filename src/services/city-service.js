const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      throw new AppError(
        "Already a city with same name exists",
        StatusCodes.BAD_REQUEST
      );
    }
    throw new AppError(
      "Something went wrong while creating the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(id) {
  try {
    const city = await cityRepository.get(id);
    return city;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError("Unable to find the requested city", error.statusCode);
    }
    throw new AppError(
      "Something went wrong while fetching the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCities() {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch (error) {
    throw new AppError(
      "Something went wrong while fetching the cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateCity(id, data) {
  try {
    const city = await cityRepository.update(id, data);
    return city;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Unable to find the requested city to update",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong while updating the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteCity(id) {
  try {
    const response = await cityRepository.destroy({ id });
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The requested city to delete is not found",
        error.statusCode
      );
    }
    throw new AppError(
      "Something went wrong while deleting the city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
  getCity,
  getCities,
  updateCity,
  deleteCity,
};
