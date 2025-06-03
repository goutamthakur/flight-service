const express = require("express");
const router = express.Router();

const { FlightMiddlewares } = require("../../middlewares");
const { FlightController } = require("../../controllers");

// POST /api/v1/flights
router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightController.createFlight
);

// Get /api/v1/flights?trips=BOM-DEL
router.get(
  "/",
  FlightController.getAllFlights
);

module.exports = router;
