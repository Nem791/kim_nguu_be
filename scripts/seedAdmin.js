const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config(); // load .env
mongoose.connect(process.env.MONGO_URI);

export async function seedAdmin() {
  const existing = await User.findOne({ username });
  if (existing) {
    console.log("Admin already exists.");
    return process.exit();
  }

  console.log("✅ Admin user created!");
  process.exit();
}
