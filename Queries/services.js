const db = require("../db/db.Config.js");

/**
 * Retrieves all services from the database.
 * @returns {Promise<Array>} An array of objects representing all services.
 * @throws {Error} If an error occurs during the retrieval of services.
 */

const getAllServices = async () => {
  try {
    const allServices = await db.any("SELECT * FROM services");
    return allServices;
  } catch (error) {
    console.error("Error retrieving services:", error);
    throw error;
  }
};

/**
 * Retrieves a specific service from the database based on its ID.
 * @param {number} id - The ID of the service to retrieve.
 * @returns {Promise<Object>} An object representing the found service.
 * @throws {Error} If an error occurs during the retrieval of the service.
 */

const getOneService = async (id) => {
  try {
    const oneService = await db.one("SELECT * FROM services WHERE id=$1", [id]);
    return oneService;
  } catch (error) {
    console.error("Error retrieving service:", error);
    throw error;
  }
};

/**
 * Deletes a specific service from the database based on its ID.
 * @param {number} id - The ID of the service to delete.
 * @returns {Promise<Object>} An object representing the deleted service.
 * @throws {Error} If an error occurs during the deletion of the service.
 */

const deleteService = async (id) => {
  try {
    const deletedService = await db.one(
      "DELETE FROM services WHERE id=$1 RETURNING *",
      [id]
    );
    return deletedService;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

/**
 * Creates a new service in the database.
 * @param {Object} service - An object containing the information of the new service.
 * @returns {Promise<Object>} An object representing the created service.
 * @throws {Error} If an error occurs during the creation of the service.
 */

const createService = async (service) => {
  try {
    const createdService = await db.one(
      "INSERT INTO services (barber_id, service_name, price) VALUES($1, $2, $3) RETURNING *",
      [service.barber_id, service.service_name, service.price]
    );
    return createdService;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

/**
 * Updates the information of a specific service in the database.
 * @param {number} id - The ID of the service to update.
 * @param {Object} service - An object containing the updated information of the service.
 * @returns {Promise<Object>} An object representing the updated service.
 * @throws {Error} If an error occurs during the update of the service.
 */

const updateService = async (id, service) => {
  try {
    const { barber_id, service_name, price } = service;
    const updatedService = await db.one(
      "UPDATE services SET barber_id=$1, service_name=$2, price=$3 WHERE id=$4 RETURNING *",
      [barber_id, service_name, price, id]
    );
    return updatedService;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

module.exports = {
  getAllServices,
  getOneService,
  createService,
  deleteService,
  updateService,
};
