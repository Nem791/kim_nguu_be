const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

const {
  validateCreateReservation,
  validateUpdateReservation,
} = require("../validators/reservationValidator");

const validate = require("../middleware/validate");
const verifyToken = require("../middleware/verifyToken");

// Create a reservation
router.post(
  "/",
  validateCreateReservation,
  validate,
  reservationController.createReservation
);

// Get a single reservation by ID
router.get("/:id", reservationController.getReservationById);

// Get all reservations with optional query filters
router.get("/", reservationController.getReservations);

// Update a reservation by ID
router.put(
  "/:id",
  verifyToken,
  validateUpdateReservation,
  validate,
  reservationController.updateReservation
);

// Delete a reservation by ID
router.delete("/:id", verifyToken, reservationController.deleteReservation);

module.exports = router;
