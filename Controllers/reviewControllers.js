const express = require("express");

const {
  getAllReviews,
  getOneReview,
  deleteReview,
  updateReviews,
  createReview,
  getReviewsByBarberId
} = require("../Queries/review.js");

const reviews = express.Router();

/**
 * Retrieves all reviews.
 * @route GET /reviews
 * @returns {Array} An array of review objects.
 * @throws {Error} If there's an error retrieving reviews.
 */
reviews.get("/", async (req, res) => {
  try {
    const allReview = await getAllReviews();
    if (allReview.length > 0) {
      res.status(200).json({ success: true, payload: allReview });
    } else {
      res.status(404).json({ success: false, error: "No reviews found" });
    }
  } catch (error) {
    console.error("Error fetching reviews", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

/**
 * Retrieves a specific review by ID.
 * @route GET /reviews/:id
 * @param {number} id - The ID of the review to retrieve.
 * @returns {Object} The review object.
 * @throws {Error} If the specified review is not found or if there's an error retrieving the review.
 */
reviews.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneReview = await getOneReview(id);
    if (oneReview) {
      res.status(200).json(oneReview);
    } else {
      res.status(404).json("error fetching one review", error);
    }
  } catch (error) {
    res.status(500).json("error internal", error);
  }
});

/**
 * Deletes a review by ID.
 * @route DELETE /reviews/:id
 * @param {number} id - The ID of the review to delete.
 * @returns {Object} The deleted review object.
 * @throws {Error} If the specified review is not found or if there's an error deleting the review.
 */
reviews.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReview(id);
    if (deletedReview) {
      res.status(200).json({ success: true, payload: deletedReview });
    } else {
      res.status(404).json({ success: false, error: "Error deleting review" });
    }
  } catch (error) {
    console.error("Error deleting", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Updates a review by ID.
 * @route PUT /reviews/:id
 * @param {number} id - The ID of the review to update.
 * @param {Object} req.body - The updated review object.
 * @returns {Object} The updated review object.
 * @throws {Error} If the specified review is not found or if there's an error updating the review.
 */
reviews.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await updateReviews(id, req.body);
    if (updatedReview) {
      res.status(200).json({ success: true, payload: updatedReview });
    } else {
      res
        .status(404)
        .json({ success: false, error: "Error updating the review" });
    }
  } catch (error) {
    console.error("Error in catch", error);
    res.status(500).json({ success: false, error: "Internal Error" });
  }
});

/**
 * Creates a new review.
 * @route POST /reviews
 * @param {Object} req.body - The review object to create.
 * @returns {Object} The created review object.
 * @throws {Error} If there's an error creating the review.
 */
reviews.post("/", async (req, res) => {
  try {
    const createdReview = await createReview(req.body);
    if (createdReview) {
      res.status(200).json({ success: true, payload: createdReview });
    } else {
      res.status(404).json({ success: false, error: "Cannot create Review-" });
    }
  } catch (error) {
    console.error("Error Creating review", error);
    res.status(500).json({ success: false, error: "Internal Error" });
  }
});

/**
 * Retrieves all reviews for a specific barber by ID.
 * @route GET /reviews/barber/:barberId
 * @param {number} barberId - The ID of the barber to retrieve reviews for.
 * @returns {Array} An array of review objects.
 * @throws {Error} If there's an error retrieving reviews.
 */
reviews.get("/barber/:barberId", async (req, res) => {
  try {
    const { barberId } = req.params;
    const reviews = await getReviewsByBarberId(barberId);
    if (reviews.length > 0) {
      res.status(200).json({ success: true, payload: reviews });
    } else {
      res.status(404).json({ success: false, error: "No reviews found" });
    }
  } catch (error) {
    console.error("Error fetching reviews for barber", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = reviews;