const express = require("express");
const { ServerConfig } = require("./config");
const app = express();
const apiRoutes = require("./routes");

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server successfully started on port: ${ServerConfig.PORT}`);
});
