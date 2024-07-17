const express = require("express");
const {
  getAllServices,
  getOneService,
  createService,
  deleteService,
  updateService,
} = require("../Queries/services.js");

const service = express.Router();

/**
 * Retrieves all services.
 * @route GET /service
 * @returns {Array} An array of service objects.
 * @throws {Error} If there's an error retrieving services.
 */
service.get("/", async (req, res) => {
  try {
    const allServices = await getAllServices();
    if (allServices.length > 0) {
      res.status(200).json({ success: true, payload: allServices });
    } else {
      res.status(404).json({ success: false, error: "No services found" });
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Retrieves a specific service by ID.
 * @route GET /service/:id
 * @param {number} id - The ID of the service to retrieve.
 * @returns {Object} The service object.
 * @throws {Error} If the specified service is not found or if there's an error retrieving the service.
 */
service.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneService = await getOneService(id);
    if (oneService) {
      res.status(200).json({ success: true, payload: oneService });
    } else {
      res.status(404).json({ success: false, error: "Service not found" });
    }
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Creates a new service.
 * @route POST /service
 * @param {Object} req.body - The service object to create.
 * @returns {Object} The created service object.
 * @throws {Error} If there's an error creating the service.
 */
service.post("/", async (req, res) => {
  try {
    const createdService = await createService(req.body);
    res.status(201).json({ success: true, payload: createdService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(400).json({ success: false, error: "Cannot create service" });
  }
});

/**
 * Deletes a service by ID.
 * @route DELETE /service/:id
 * @param {number} id - The ID of the service to delete.
 * @returns {Object} The deleted service object.
 * @throws {Error} If the specified service is not found or if there's an error deleting the service.
 */
service.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await deleteService(id);
    if (deletedService) {
      res.status(200).json({ success: true, payload: deletedService });
    } else {
      res.status(404).json({ success: false, error: "Service not found" });
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Updates a service by ID.
 * @route PUT /service/:id
 * @param {number} id - The ID of the service to update.
 * @param {Object} req.body - The updated service object.
 * @returns {Object} The updated service object.
 * @throws {Error} If the specified service is not found or if there's an error updating the service.
 */
service.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await updateService(id, req.body);
    if (updatedService) {
      res.status(200).json({ success: true, payload: updatedService });
    } else {
      res.status(404).json({ success: false, error: "Service not found" });
    }
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = service;