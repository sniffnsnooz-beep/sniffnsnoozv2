import mongoose from "mongoose";

const InsuranceLeadSchema = new mongoose.Schema(
  {
    petType: { type: String, required: true }, // Dog, Cat, etc.
    breed: { type: String, required: true },
    age: { type: String, required: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    status: { type: String, default: "New" }, // New, Contacted, Closed, Rejected
  },
  { timestamps: true }
);

export default mongoose.models.InsuranceLead || mongoose.model("InsuranceLead", InsuranceLeadSchema);
