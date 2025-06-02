const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Create a reservation
router.post("/", reservationController.createReservation);

// Get a single reservation by ID
router.get("/:id", reservationController.getReservationById);

// Get all reservations with optional query filters
router.get("/", reservationController.getReservations);

// Update a reservation by ID
router.put("/:id", reservationController.updateReservation);

// Delete a reservation by ID
router.delete("/:id", reservationController.deleteReservation);

module.exports = router;
