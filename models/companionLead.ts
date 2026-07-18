import mongoose from "mongoose";

const CompanionLeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    preferredBreed: { type: String, required: true },
    budget: { type: String },
    apartmentOrHouse: { type: String },
    previousPetExperience: { type: String },
    familyMembers: { type: String },
    message: { type: String },
    status: { type: String, default: "New" }, // New, Contacted, Follow Up, Completed
  },
  { timestamps: true }
);

export default mongoose.models.CompanionLead || mongoose.model("CompanionLead", CompanionLeadSchema);
