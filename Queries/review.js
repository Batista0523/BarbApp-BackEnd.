const db = require("../db/db.Config.js");

/**
 * Retrieves all reviews from the database.
 * @returns {Promise<Array>} An array of objects representing all reviews.
 * @throws {Error} If an error occurs during the retrieval of reviews.
 */

const getAllReviews = async () => {
  try {
    const allReview = await db.any("SELECT * FROM reviews");
    return allReview;
  } catch (error) {
    console.error("Error retrieving the reviews", error);
    throw error;
  }
};

/**
 * Retrieves a specific review from the database based on its ID.
 * @param {number} id - The ID of the review to retrieve.
 * @returns {Promise<Object>} An object representing the found review.
 * @throws {Error} If an error occurs during the retrieval of the review.
 */

const getOneReview = async (id) => {
  try {
    const oneReview = await db.one("SELECT * FROM reviews  WHERE id=$1", [id]);
    return oneReview;
  } catch (error) {
    console.error("Error retrieving one review", error);
    throw error;
  }
};

/**
 * Deletes a specific review from the database based on its ID.
 * @param {number} id - The ID of the review to delete.
 * @returns {Promise<Object>} An object representing the deleted review.
 * @throws {Error} If an error occurs during the deletion of the review.
 */

const deleteReview = async (id) => {
  try {
    const deletedReview = await db.one(
      "DELETE FROM reviews WHERE id=$1 RETURNING *",
      [id]
    );
    return deletedReview;
  } catch (error) {
    console.error("Error deleting review", error);
    throw error;
  }
};

/**
 * Updates the information of a specific review in the database.
 * @param {number} id - The ID of the review to update.
 * @param {Object} review - An object containing the updated information of the review.
 * @returns {Promise<Object>} An object representing the updated review.
 * @throws {Error} If an error occurs during the update of the review.
 */

const updateReviews = async (id, review) => {
  try {
    const { customer_id, barber_id, rating, review_text } = review;
    const updatedReview = await db.one(
      "UPDATE reviews SET customer_id=$1, barber_id=$2, rating=$3, review_text=$4 WHERE id=$5 RETURNING *",
      [customer_id, barber_id, rating, review_text, id]
    );
    return updatedReview;
  } catch (error) {
    console.error("Error updating review", error);
    throw error;
  }
};

/**
 * Creates a new review in the database.
 * @param {Object} review - An object containing the information of the new review.
 * @returns {Promise<Object>} An object representing the created review.
 * @throws {Error} If an error occurs during the creation of the review.
 */

const createReview = async (review) => {
  try {
    const createdReview = await db.one(
      "INSERT INTO reviews (customer_id , barber_id , rating , review_text) VALUES ($1,$2,$3,$4) RETURNING *",
      [review.customer_id, review.barber_id, review.rating, review.review_text]
    );
    return createdReview;
  } catch (error) {
    console.error("Error creating review", error);
    throw error;
  }
};
/**
 * Retrieves all reviews for a specific barber from the database.
 * @param {number} barberId - The ID of the barber.
 * @returns {Promise<Array>} An array of objects representing all reviews for the barber.
 * @throws {Error} If an error occurs during the retrieval of reviews.
 */
const getReviewsByBarberId = async (barberId) => {
  try {
    const reviews = await db.any("SELECT * FROM reviews WHERE barber_id = $1", [barberId]);
    return reviews;
  } catch (error) {
    console.error("Error retrieving reviews for barber", error);
    throw error;
  }
};

module.exports = {
  getAllReviews,
  getOneReview,
  deleteReview,
  updateReviews,
  createReview,
  getReviewsByBarberId
};