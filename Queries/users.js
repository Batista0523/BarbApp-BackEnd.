const bcrypt = require("bcrypt");
const db = require("../db/db.Config.js");
/**
 * Retrieves all users from the database.
 * @returns {Promise<Array>} An array of objects representing all users.
 * @throws {Error} If an error occurs during the retrieval of users.
 */

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (err) {
    console.error("Error retrieving users", err);
    throw err;
  }
};
/**
 * Retrieves a specific user from the database based on their ID.
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<Object>} An object representing the found user.
 * @throws {Error} If an error occurs during the retrieval of the user.
 */

const getOneUser = async (id) => {
  try {
    const oneUser = await db.one("SELECT * FROM users WHERE id=$1", [id]);
    return oneUser;
  } catch (error) {
    console.error("Error retrieving one user", error);
    throw error;
  }
};

/**
 * Deletes a specific user from the database based on their ID.
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<Object>} An object representing the deleted user.
 * @throws {Error} If an error occurs during the deletion of the user.
 */

const deleteUser = async (id) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};

/**
 * Updates the information of a specific user in the database.
 * @param {number} id - The ID of the user to update.
 * @param {Object} user - An object containing the updated information of the user.
 * @returns {Promise<Object>} An object representing the updated user.
 * @throws {Error} If an error occurs during the update of the user.
 */

const updateUser = async (id, user) => {
  try {
    const {
      name,
      username,
      password,
      email,
      role,
      profile_info,
      phone_number,
      address,
    } = user;

    // Hash the password if it's provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const updatedUser = await db.one(
      "UPDATE users SET name=$1, username=$2, password=$3, email=$4, role=$5, profile_info=$6, phone_number=$7, address=$8 WHERE id=$9 RETURNING *",
      [
        name,
        username,
        hashedPassword || user.password, // Use hashed password or existing one if not changed
        email,
        role,
        profile_info,
        phone_number,
        address,
        id,
      ]
    );
    return updatedUser;
  } catch (error) {
    console.error("Error updating users", error);
    throw error;
  }
};

/**
 * Creates a new user in the database.
 * @param {Object} user - An object containing the information of the new user.
 * @returns {Promise<Object>} An object representing the created user.
 * @throws {Error} If an error occurs during the creation of the user.
 */

const createUser = async (user) => {
  try {
    // Check if username or email already exists
    const existingUser = await db.oneOrNone(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [user.username, user.email]
    );

    if (existingUser) {
      throw new Error("Name, username, or email is already registered. Please use another email or log in with your account.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await db.one(
      "INSERT INTO users (name, username, password, email, role, profile_info, phone_number, address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        user.name,
        user.username,
        hashedPassword, // Store hashed password
        user.email,
        user.role,
        user.profile_info,
        user.phone_number,
        user.address,
      ]
    );
    return createdUser;
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
};
const authenticateUser = async (username, password) => {
  try {
    const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [username]);

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    delete user.password;

    return user;
  } catch (error) {
    console.error("Error during user authentication", error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  authenticateUser
};
