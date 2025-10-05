const express = require("express");
const swaggerUi = require("swagger-ui-express");
const { StatusCodes } = require("http-status-codes");

const { ServerConfig, SwaggerConfig } = require("./config");
const { ErrorResponse } = require("./utils/common");

const app = express();
const apiRoutes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(SwaggerConfig.swaggerSpec)
);

app.use((req, res) => {
  ErrorResponse.error = `${req.originalUrl} not found`;
  res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
});

app.listen(ServerConfig.PORT, () => {
  console.log(
    `Successfully started the flight-service on port: ${ServerConfig.PORT}`
  );
});
