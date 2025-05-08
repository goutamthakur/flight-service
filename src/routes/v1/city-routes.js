const express = require("express");
const router = express.Router();

const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares")

// POST /api/v1/cities
router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);
  
// GET /api/v1/cities/:id
router.get(
  "/:id",
  CityController.getCity
);
  
// GET /api/v1/cities
router.get(
    "/",
    CityController.getCities
);
  
// PATCH /api/v1/cities/:id
router.patch(
    "/:id",
    CityMiddlewares.validateCreateRequest,
    CityController.updateCity
);
  
// DELETE /api/v1/cities/:id
router.delete(
    "/:id",
    CityController.deleteCity
);
  
module.exports = router;