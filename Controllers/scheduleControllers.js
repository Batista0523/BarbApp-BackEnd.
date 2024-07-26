const express = require("express");

const { getAllSchedule, getOneSchedule } = require("../Queries/schedule.js");

const schedule = express.Router();

schedule.get("/", async (req, res) => {
  try {
    const allSchedule = await getAllSchedule();
    if (allSchedule.length > 0) {
      res.status(200).json({ success: true, payload: allSchedule });
    } else {
      res.status(404).json({ success: false, error: "No schedule found" });
    }
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
schedule.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneSchedule = await getOneSchedule(id);
    if (oneSchedule) {
      res.status(200).json({ success: true, payload: oneSchedule });
    } else {
      res.status(404).json({ success: false, error: "schedule not found" });
    }
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


module.exports= schedule