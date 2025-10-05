const express = require("express");
const router = express.Router();

const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");

/**
 * @swagger
 * /api/v1/airplanes:
 *   post:
 *     tags:
 *       - airplanes
 *     summary: Create an airplane
 *     description: Creates an airplane which is used to create flight
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelNumber:
 *                 type: string
 *                 example: "A320"
 *               capacity:
 *                 type: integer
 *                 example: 180
 *     responses:
 *       201:
 *         description: Created an airplane successfully
 *       400:
 *         description: Bad request - field missing or invalid data
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

/**
 * @swagger
 * /api/v1/airplanes/{id}:
 *   get:
 *     tags:
 *       - airplanes
 *     summary: Get airplane by id
 *     description: Returns an object of airplane
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id of the airplane
 *     responses:
 *       200:
 *         description: Successfully found the airplane
 *       404:
 *         description: Airplane not found. Invalid id
 *       500:
 *         description: Internal server error
 */
router.get("/:id", AirplaneController.getAirplane);

/**
 * @swagger
 * /api/v1/airplanes:
 *   get:
 *     tags:
 *       - airplanes
 *     summary: Get all the airplanes
 *     description: Returns an array of object
 *     responses:
 *       200:
 *         description: Request successful
 *       500:
 *         description: Internal server error
 */
router.get("/", AirplaneController.getAirplanes);

/**
 * @swagger
 * /api/v1/airplanes/{id}:
 *   patch:
 *     tags:
 *       - airplanes
 *     summary: Update airplane by id
 *     description: Returns the number of rows affected
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id of the airplane
 *     responses:
 *       200:
 *         description: Successfully updated the airplane
 *       404:
 *         description: Airplane not found. Invalid id
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", AirplaneController.updateAirplane);

/**
 * @swagger
 * /api/v1/airplanes/{id}:
 *   delete:
 *     tags:
 *       - airplanes
 *     summary: Delete airplane by id
 *     description: Returns the number of rows affected
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id of the airplane
 *     responses:
 *       200:
 *         description: Successfully deleted the airplane
 *       404:
 *         description: Airplane not found. Invalid id
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", AirplaneController.deleteAirplane);

module.exports = router;
