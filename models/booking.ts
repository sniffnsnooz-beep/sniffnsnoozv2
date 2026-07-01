import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      name: String,
      phone: String,
      email: String,
      address: String,
      location: {
        lat: Number,
        lng: Number,
      },
    },

    pet: {
      parentName: String,
      petName: String,
      breed: String,
      age: String,
      allergies: String,
      friendlyWithHumans: Boolean,
      friendlyWithPets: Boolean,
    },

    services: Array,

    date: String,
    slot: String,
    total: Number,
    status: { type: String, default: "Pending" },

    consentAccepted: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
