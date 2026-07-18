import mongoose from "mongoose";

const CompanionSchema = new mongoose.Schema(
  {
    breedName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, default: "Puppy" }, // Puppy, Kitten, etc.
    age: { type: String },
    gender: { type: String },
    location: { type: String },
    temperament: { type: String },
    description: { type: String },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    featuredBadge: { type: Boolean, default: false },
    status: { type: String, default: "Available" }, // Available, Adopted, Archived
  },
  { timestamps: true }
);

export default mongoose.models.Companion || mongoose.model("Companion", CompanionSchema);
