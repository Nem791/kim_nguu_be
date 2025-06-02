// models/Reservation.ts
import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    area: {
      type: String,
      //   required: true,
      enum: ["HÀ NỘI", "TP. HỒ CHÍ MINH", "HẢI PHÒNG"], // extend as needed
    },
    restaurant: {
      type: String,
      //   required: true,
    },
    date: {
      type: String, // can change to Date if properly parsed on backend
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    minute: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      required: true,
      min: 1,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Ready", "Cancelled"],
      default: "Pending",
    },
    orderNumber: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

ReservationSchema.pre("save", async function (next) {
  if (this.isNew && !this.orderNumber) {
    const now = new Date();

    // Get YYMMDD format
    const yy = String(now.getFullYear()).slice(2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const datePrefix = `${yy}${mm}${dd}`; // e.g., "250601"

    // Count existing reservations with today's prefix
    const Reservation = mongoose.model("Reservation");
    const todayRegex = new RegExp(`^${datePrefix}-\\d{4}$`);

    const count = await Reservation.countDocuments({
      orderNumber: { $regex: todayRegex },
    });

    const sequence = String(count + 1).padStart(4, "0"); // e.g., "0001"
    this.orderNumber = `${datePrefix}-${sequence}`;
  }

  next();
});

export default mongoose.model("Reservation", ReservationSchema);
