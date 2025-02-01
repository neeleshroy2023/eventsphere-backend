const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const mongoConnection = require("./database/connection");

require("dotenv").config();

app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/users");

const authMiddleware = require("./middlewares/auth");

mongoConnection();

app.get('/', (_, res) => {
  return res.send("Welcome to eventsphere")
})

app.get("/healthcheck", (_, res) => {
  return res.status(200).send("system up and running");
});

app.use(authMiddleware);

app.use("/users", userRoutes);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;