const express = require("express");
const {
  getAllAppointments,
  getOneAppointment,
  createAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} = require("../Queries/appointment.js");


const appointments = express.Router();

// Get all appointments
appointments.get("/", async (req, res) => {
  try {
    const allAppointments = await getAllAppointments();
    res.status(200).json({ success: true, payload: allAppointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get one appointment by id
appointments.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneAppointment = await getOneAppointment(id);
    if (oneAppointment) {
      res.status(200).json({ success: true, payload: oneAppointment });
    } else {
      res.status(404).json({ success: false, error: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Create a new appointment
appointments.post("/", async (req, res) => {
  try {
    const createdAppointment = await createAppointments(req.body);
    res.status(201).json({ success: true, payload: createdAppointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(400).json({ success: false, error: "Cannot create appointment" });
  }
});

// Update appointment status to completed
appointments.put("/:id/complete", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await updateAppointmentStatus(id, 'completed');
    if (updatedAppointment) {
      res.status(200).json({ success: true, payload: updatedAppointment });
    } else {
      res.status(404).json({ success: false, error: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error updating appointment status to 'completed':", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Delete an appointment
appointments.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await deleteAppointment(id);
    if (deletedAppointment) {
      res.status(200).json({ success: true, payload: deletedAppointment });
    } else {
      res.status(404).json({ success: false, error: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = appointments;
