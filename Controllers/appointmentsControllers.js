const express = require("express");
const {
  getAllAppointments,
  getOneAppointment,
  createAppointments,
  deleteAppointment,
  updateAppointment,
} = require("../Queries/appointment.js");

const appointments = express.Router();

/**
 * Retrieves all appointments.
 * @route GET /appointments
 * @returns {Array} An array of appointment objects.
 * @throws {Error} If there's an error retrieving appointments.
 */
appointments.get("/", async (req, res) => {
  try {
    const allAppointments = await getAllAppointments();
    if (allAppointments.length > 0) {
      res.status(200).json({ success: true, payload: allAppointments });
    } else {
      res.status(404).json({ success: false, error: "No appointments found" });
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Retrieves a specific appointment by ID.
 * @route GET /appointments/:id
 * @param {number} id - The ID of the appointment to retrieve.
 * @returns {Object} The appointment object.
 * @throws {Error} If the specified appointment is not found or if there's an error retrieving the appointment.
 */
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

/**
 * Creates a new appointment.
 * @route POST /appointments
 * @param {Object} req.body - The appointment object to create.
 * @returns {Object} The created appointment object.
 * @throws {Error} If there's an error creating the appointment.
 */
appointments.post("/", async (req, res) => {
  try {
    const createdAppointment = await createAppointments(req.body);
    if (createdAppointment) {
      res.status(201).json({ success: true, payload: createdAppointment });
    } else {
      res
        .status(404)
        .json({ success: false, error: "error creating appointment" });
    }
  } catch (error) {
    console.error("Error creating appointment:", error);
    res
      .status(400)
      .json({ success: false, error: "Cannot create appointment" });
  }
});

/**
 * Deletes an appointment by ID.
 * @route DELETE /appointments/:id
 * @param {number} id - The ID of the appointment to delete.
 * @returns {Object} The deleted appointment object.
 * @throws {Error} If the specified appointment is not found or if there's an error deleting the appointment.
 */
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

/**
 * Updates an appointment by ID.
 * @route PUT /appointments/:id
 * @param {number} id - The ID of the appointment to update.
 * @param {Object} req.body - The updated appointment object.
 * @returns {Object} The updated appointment object.
 * @throws {Error} If the specified appointment is not found or if there's an error updating the appointment.
 */
appointments.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAppointment = await updateAppointment(id, req.body);
    if (updatedAppointment) {
      res.status(200).json({ success: true, payload: updatedAppointment });
    } else {
      res.status(404).json({ success: false, error: "Appointment not found" });
    }
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = appointments;
