const express = require("express");
const cors = require("cors");
const app = express();
const appointmentsControllers = require("./Controllers/appointmentsControllers.js");
const serviceController = require("./Controllers/servicesControllers.js");
const reviewControllers = require("./Controllers/reviewControllers.js");
const userControllers = require("./Controllers/usersControllers");
const scheduleController = require("./Controllers/scheduleControllers.js");
app.use(cors());
app.use(express.json());

app.use("/appointments", appointmentsControllers);
app.use("/services", serviceController);
app.use("/reviews", reviewControllers);
app.use("/users", userControllers);
app.use("/barber_schedules", scheduleController);
app.get("/", (req, res) => {
  res.send("Welcome to Barbapp");
});

app.get("*", (req, res) => {
  res.status(404).json({ success: false, data: { error: "page not found" } });
});

module.exports = app;
