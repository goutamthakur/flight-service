const express = require("express");

const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");

const router = express.Router();

// POST /api/v1/airplanes
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

// GET /api/v1/airplanes/:id
router.get(
  "/:id",
  AirplaneController.getAirplane
);

// GET /api/v1/airplanes
router.get(
  "/",
  AirplaneController.getAirplanes
);

// PATCH /api/v1/airplanes/:id
router.patch(
  "/:id",
  AirplaneController.updateAirplane
);

// DELETE /api/v1/airplanes/:id
router.delete(
  "/:id",
  AirplaneController.deleteAirplane
);

module.exports = router;
