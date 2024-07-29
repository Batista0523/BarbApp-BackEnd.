const express = require("express");

const {
  getAllSchedule,
  getOneSchedule,
  deleteSchedule,
  createSchedule,
  updateSchedule,
} = require("../Queries/schedule.js");

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

schedule.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await deleteSchedule(id);
    if (deletedSchedule) {
      res.status(200).json({ success: true, payload: deletedSchedule });
    } else {
      res
        .status(404)
        .json({ success: false, error: "Error deleting schedule" });
    }
  } catch (error) {
    console.error("Internal Error deleting", error);
    res.status(500).json({ success: false, error: "Internal server Error" });
  }
});

schedule.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSchedule = await updateSchedule(id, req.body);
    if (updatedSchedule) {
      res.status(200).json({ success: true, payload: updatedSchedule });
    } else {
      res
        .status(400)
        .json({ success: false, error: "Error updating schedule" });
    }
  } catch (error) {
    console.error("Error internal", error);
    res.status(400).json({ success: false, error: "Error updating schedule" });
  }
});

schedule.post("/", async (req, res) => {
  try {
    const createdSchedule = await createSchedule(req.body);
    if (createdSchedule) {
      res.status(200).json({ success: true, payload: createdSchedule });
    } else {
      res
        .status(404)
        .json({ success: false, error: "Error creating schedule" });
    }
  } catch (err) {
    console.error("internal error", err);
    res.status(500).json({ success: false, error: "Internar Error creating" });
  }
});
module.exports = schedule;
