require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoConnection = require("./database/connection");
const logger = require("./utils/logger");

const authMiddleware = require("./middlewares/auth");
const organiserMiddleware = require("./middlewares/organisers");

const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");

const port = process.env.PORT || 3000;

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoConnection();

app.get("/", (_, res) => {
  return res.send("Welcome to eventsphere");
});

app.get("/healthcheck", (_, res) => {
  return res.status(200).send("EventSphere - System up and running ✅");
});

app.use(authMiddleware);
app.use("/users", userRoutes);

app.use(organiserMiddleware);
app.use("/events", eventRoutes);

app.listen(port, (err) => {
  if (err) {
    return logger.error("Error starting server", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
