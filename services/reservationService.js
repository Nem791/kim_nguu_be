const Reservation = require("../models/Reservation").default;

const bcrypt = require("bcrypt");
const user = require("../models/user");
/**
 * Create a new reservation
 * @param {Object} data - Reservation fields (e.g., name, phone, partySize, dateTime)
 * @returns {Promise<Object>} The saved reservation
 */
const createReservation = async (data) => {
  const reservation = new Reservation(data);
  return await reservation.save();
};

/**
 * Retrieve a single reservation by its MongoDB ObjectId
 * @param {string} id - Reservation _id
 * @returns {Promise<Object|null>} The reservation or null if not found
 */
const getReservationById = async (id) => {
  return await Reservation.findById(id);
};

/**
 * List reservations with optional filters, pagination and sorting
 * @param {Object} [query={}] - Mongoose find query (e.g., { date: { $gte: today } })
 * @param {Object} [options={}] - Extra options { page, limit, sort }
 * @returns {Promise<{ data:Object[], total:number }>} Paginated result
 */
const getReservations = async (query = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sort = "-createdAt", // newest first
  } = options;

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Reservation.find(query).sort(sort).skip(skip).limit(limit),
    Reservation.countDocuments(query),
  ]);

  return { data, total };
};

/**
 * Update an existing reservation (PATCH/PUT)
 * @param {string} id - Reservation _id
 * @param {Object} updates - Fields to update
 * @param {Object} [options={ new: true }] - Mongoose options
 * @returns {Promise<Object|null>} The updated reservation or null if not found
 */
const updateReservation = async (id, updates, options = { new: true }) => {
  return await Reservation.findByIdAndUpdate(id, updates, options);
};

/**
 * Delete (cancel) a reservation
 * @param {string} id - Reservation _id
 * @returns {Promise<Object|null>} The deleted reservation or null if not found
 */
const deleteReservation = async (id) => {
  return await Reservation.findByIdAndDelete(id);
};

module.exports = {
  createReservation,
  getReservationById,
  getReservations,
  updateReservation,
  deleteReservation,
};
