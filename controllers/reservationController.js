const reservationService = require("../services/reservationService");
const { transformId } = require("../utils/transformId");

const createReservation = async (req, res) => {
  try {
    const io = req.app.locals.io;
    const reservation = await reservationService.createReservation(req.body);
    const transformed = transformId(reservation);

    io.emit("new-reservation", transformed);

    res.status(201).json({ success: true, data: transformed });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getReservationById = async (req, res) => {
  try {
    const reservation = await reservationService.getReservationById(
      req.params.id
    );
    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }
    const transformed = transformId(reservation);
    res.status(200).json({ success: true, data: transformed });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getReservations = async (req, res) => {
  try {
    const { page, limit, sort, ...query } = req.query;
    const options = {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      sort: sort || "-createdAt",
    };
    const result = await reservationService.getReservations(query, options);

    const transformedData = result.data.map(transformId);

    res.status(200).json({
      success: true,
      data: transformedData,
      total: result.total,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const reservation = await reservationService.updateReservation(
      req.params.id,
      req.body
    );
    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }
    const transformed = transformId(reservation);
    res.status(200).json({ success: true, data: transformed });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservation = await reservationService.deleteReservation(
      req.params.id
    );
    if (!reservation) {
      return res
        .status(404)
        .json({ success: false, message: "Reservation not found" });
    }
    const transformed = transformId(reservation);
    res.status(200).json({
      success: true,
      message: "Reservation deleted",
      data: transformed,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  createReservation,
  getReservationById,
  getReservations,
  updateReservation,
  deleteReservation,
};
