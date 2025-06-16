const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyToken = require("../middleware/verifyToken");

// Admin login
router.post("/login", adminController.login);

// Admin logout
router.post("/logout", adminController.logout);

router.get("/me", verifyToken, adminController.me);
module.exports = router;
