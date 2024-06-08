const express = require("express");
const {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../Queries/users.js");

const user = express.Router();

/**
 * Retrieves all users.
 * @route GET /user
 * @returns {Array} An array of user objects.
 * @throws {Error} If there's an error retrieving users.
 */
user.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    if (allUsers.length > 0) {
      res.status(200).json({ success: true, payload: allUsers });
    } else {
      res.status(404).json({ success: false, error: "No User Found" });
    }
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Retrieves a specific user by ID.
 * @route GET /user/:id
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Object} The user object.
 * @throws {Error} If the specified user is not found or if there's an error retrieving the user.
 */
user.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneUser = await getOneUser(id);
    if (oneUser) {
      res.status(200).json({ success: true, payload: oneUser });
    } else {
      res.status(404).json({ success: false, error: "Service not found" });
    }
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Creates a new user.
 * @route POST /user
 * @param {Object} req.body - The user object to create.
 * @returns {Object} The created user object.
 * @throws {Error} If there's an error creating the user.
 */

user.post("/", async (req, res) => {
  try {
    const createdUser = await createUser(req.body);
    if (createdUser) {
      res.status(201).json({ success: true, payload: createdUser });
    } else {
      res
        .status(404)
        .json({ success: false, error: "error creating user controller" });
    }
  } catch (error) {
    console.error("Error creating user", error);
    res.status(400).json({ success: false, error: "Cannot create user" });
  }
});

/**
 * Deletes a user by ID.
 * @route DELETE /user/:id
 * @param {number} id - The ID of the user to delete.
 * @returns {Object} The deleted user object.
 * @throws {Error} If the specified user is not found or if there's an error deleting the user.
 */
user.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    if (deletedUser) {
      res.status(200).json({ success: true, payload: deletedUser });
    } else {
      res.status(404).json({ success: false, error: "Can Not Delete User" });
    }
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Updates a user by ID.
 * @route PUT /user/:id
 * @param {number} id - The ID of the user to update.
 * @param {Object} req.body - The updated user object.
 * @returns {Object} The updated user object.
 * @throws {Error} If the specified user is not found or if there's an error updating the user.
 */
user.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);
    if (updatedUser) {
      res.status(200).json({ success: true, payload: updatedUser });
    } else {
      res.status(404).json({ success: false, error: "Can Not update Users" });
    }
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = user;
