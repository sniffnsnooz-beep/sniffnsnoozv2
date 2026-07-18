import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    mediaType: { type: String, required: true, default: "image" }, // image, video
    category: { type: String, required: true, default: "Grooming" }, // Grooming, Veterinary, Happy Pets, Companions, Events
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
