const { body, param } = require("express-validator");

const allowedAreas = ["HÀ NỘI", "TP. HỒ CHÍ MINH", "HẢI PHÒNG"];
const allowedStatuses = ["Pending", "Ready", "Cancelled"];

exports.validateCreateReservation = [
  body("name").trim().notEmpty().withMessage("Name is required."),
  body("phone")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone must be a 10-digit number."),
  body("email").optional().isEmail().withMessage("Invalid email format."),
  body("area")
    .optional()
    .isIn(allowedAreas)
    .withMessage(`Area must be one of: ${allowedAreas.join(", ")}`),
  body("restaurant").optional().trim().isString(),
  body("date").notEmpty().withMessage("Date is required."),
  body("hour").notEmpty().withMessage("Hour is required."),
  body("minute").notEmpty().withMessage("Minute is required."),
  body("guestCount")
    .isInt({ min: 1 })
    .withMessage("Guest count must be at least 1."),
  body("message").optional().trim().isString(),
  body("status")
    .optional()
    .isIn(allowedStatuses)
    .withMessage(`Status must be one of: ${allowedStatuses.join(", ")}`),
];

exports.validateUpdateReservation = [
  param("id").isMongoId().withMessage("Invalid reservation ID."),
  body("name").optional().trim().isString(),
  body("phone")
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone must be a 10-digit number."),
  body("email").optional().isEmail().withMessage("Invalid email format."),
  body("area")
    .optional()
    .isIn(allowedAreas)
    .withMessage(`Area must be one of: ${allowedAreas.join(", ")}`),
  body("restaurant").optional().trim().isString(),
  body("date").optional().trim().isString(),
  body("hour").optional().trim().isString(),
  body("minute").optional().trim().isString(),
  body("guestCount")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Guest count must be at least 1."),
  body("message").optional().trim().isString(),
  body("status")
    .optional()
    .isIn(allowedStatuses)
    .withMessage(`Status must be one of: ${allowedStatuses.join(", ")}`),
];
