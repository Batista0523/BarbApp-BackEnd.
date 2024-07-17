const db = require("../db/db.Config.js");

/**
 * Retrieves all appointments from the database.
 * @returns {Promise<Array>} An array of objects representing all appointments.
 * @throws {Error} If an error occurs during the retrieval of appointments.
 */
const getAllAppointments = async () => {
  try {
    const allAppointments = await db.any("SELECT * FROM appointments");
    return allAppointments;
  } catch (error) {
    console.log("Error in allAppoinments", error);
    throw error;
  }
};



/**
 * Retrieves a specific appointment from the database based on its ID.
 * @param {number} id - The ID of the appointment to retrieve.
 * @returns {Promise<Object>} An object representing the found appointment.
 * @throws {Error} If an error occurs during the retrieval of the appointment.
 */
const getOneAppointment = async (id) => {
  try {
    const oneAppointment = await db.one(
      "SELECT * FROM appointments WHERE id=$1",
      [id]
    );
    return oneAppointment;
  } catch (error) {
    console.error("No appointment found:", error);
    throw error;
  }
};

/**
 * Creates a new appointment in the database.
 * @param {Object} appointment - An object containing the information of the new appointment.
 * @returns {Promise<Object>} An object representing the created appointment.
 * @throws {Error} If an error occurs during the creation of the appointment.
 */
const createAppointments = async (appointment) => {
  try {
    const createdAppointment = await db.one(
      "INSERT INTO appointments (customer_id, barber_id, service_id, appointment_date, appointment_time, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        appointment.customer_id,
        appointment.barber_id,
        appointment.service_id,
        appointment.appointment_date,
        appointment.appointment_time,
        appointment.status,
      ]
    );
    return createdAppointment;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

/**
 * Deletes a specific appointment from the database based on its ID.
 * @param {number} id - The ID of the appointment to delete.
 * @returns {Promise<Object>} An object representing the deleted appointment.
 * @throws {Error} If an error occurs during the deletion of the appointment.
 */
const deleteAppointment = async (id) => {
  try {
    const deletedAppointment = await db.one(
      "DELETE FROM appointments WHERE id=$1 RETURNING * ",
      [id]
    );
    return deletedAppointment;
  } catch (error) {
    console.error("error deleting the appointment", error);
    throw error;
  }
};

/**
 * Updates the information of a specific appointment in the database.
 * @param {number} id - The ID of the appointment to update.
 * @param {Object} appointments - An object containing the updated information of the appointment.
 * @returns {Promise<Object>} An object representing the updated appointment.
 * @throws {Error} If an error occurs during the update of the appointment.
 */
const updateAppointment = async (id, appointments) => {
  try {
    const {
      customer_id,
      barber_id,
      service_id,
      appointment_date,
      appointment_time,
      status,
    } = appointments;
    const updatedAppointment = await db.one(
      "UPDATE appointments SET customer_id=$1, barber_id=$2, service_id=$3, appointment_date=$4 ,appointment_time=$5, status=$6 WHERE id=$7 RETURNING *",
      [
        customer_id,
        barber_id,
        service_id,
        appointment_date,
        appointment_time,
        status,
        id,
      ]
    );
    return updatedAppointment;
  } catch (error) {
    console.error("no updated appointment", error);
    throw error;
  }
};

module.exports = {
  getAllAppointments,
  getOneAppointment,
  createAppointments,
  deleteAppointment,
  updateAppointment,
};