const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URL;

    if (!mongoURI) {
      throw new Error("MONGODB_URL environment variable is not defined.");
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
