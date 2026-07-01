import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  image: { type: String }, 
  video: { type: String }, 
  category: { type: String, default: "Pet Care" },
  author: { type: String, default: "Sniff n Snooz" },
}, { timestamps: true });

export default mongoose.models.News || mongoose.model("News", NewsSchema);