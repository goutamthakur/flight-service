const express = require("express");
const { ServerConfig } = require("./config");

const app = express();
const apiRoutes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the flight-service on port: ${ServerConfig.PORT}`);
});
