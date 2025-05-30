const express = require("express");
const router = express.Router();

const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes");
const flightRoutes = require("./flight-routes");

const { InfoController } = require("../../controllers");

router.use("/airplanes", airplaneRoutes);

router.use("/cities", cityRoutes);

router.use("/airports", airportRoutes);

router.use("/flights", flightRoutes);

router.get("/info", InfoController.info);

module.exports = router;
