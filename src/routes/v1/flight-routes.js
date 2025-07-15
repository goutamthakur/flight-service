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

// Get /api/v1/flights/:id
router.get(
  "/:id",
  FlightController.getFlight
);

// Patch /api/v1/flights/:id/seats
router.patch(
  "/:id/seats",
  FlightMiddlewares.validateUpdateSeats,
  FlightController.updateSeats
);

module.exports = router;
