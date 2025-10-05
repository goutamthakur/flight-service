const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");
const { version } = require("./../../package.json");

// Option object for swagger docs
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "flight-service",
      version: version,
    },
  },
  apis: [path.join(__dirname, "../routes/**/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerSpec,
};
