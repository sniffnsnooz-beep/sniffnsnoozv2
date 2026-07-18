import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectToDatabase from "@/libs/db";
import Companion from "@/models/companion";
import CompanionLead from "@/models/companionLead";

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
}

// GET: Fetch available companions
export async function GET() {
  try {
    await connectToDatabase();
    const companions = await Companion.find({ status: "Available" }).sort({ createdAt: -1 });
    return NextResponse.json(companions, { status: 200 });
  } catch (error: any) {
    console.error("GET companions error:", error);
    return NextResponse.json({ message: "Fetch failed", error: error.message }, { status: 500 });
  }
}

// POST: Save companion lead form & send emails
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      name,
      phone,
      email,
      city,
      preferredBreed,
      budget,
      apartmentOrHouse,
      previousPetExperience,
      familyMembers,
      message,
    } = body;

    if (!name || !phone || !email || !city || !preferredBreed) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Save lead to database
    const newLead = await CompanionLead.create({
      name,
      phone,
      email,
      city,
      preferredBreed,
      budget,
      apartmentOrHouse,
      previousPetExperience,
      familyMembers,
      message,
    });

    // Send emails
    const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.GMAIL_USER || "";
    const transporter = createTransporter();

    // 1. Owner email
    try {
      await transporter.sendMail({
        from: `"Sniffnsnooz Companion Support" <${process.env.GMAIL_USER}>`,
        to: OWNER_EMAIL,
        subject: "🐾 New Companion Consultation Lead Received",
        html: `
          <h2>🐾 New Companion Request</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>City:</b> ${city}</p>
          <p><b>Preferred Breed:</b> ${preferredBreed}</p>
          <p><b>Estimated Budget:</b> ${budget || "N/A"}</p>
          <p><b>Residence:</b> ${apartmentOrHouse}</p>
          <p><b>Experience:</b> ${previousPetExperience}</p>
          <p><b>Family Members:</b> ${familyMembers || "N/A"}</p>
          <p><b>Message:</b> ${message || "N/A"}</p>
        `,
      });
    } catch (err) {
      console.error("Owner email failed:", err);
    }

    // 2. User email
    try {
      await transporter.sendMail({
        from: `"Sniffnsnooz" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "🐾 Companion Consultation Confirmed!",
        html: `
          <h2>Hello ${name},</h2>
          <p>Thank you for reaching out to Sniffnsnooz for your companion consultation request.</p>
          <p>Our expert veterinarians and breed advisors will analyze your lifestyle preferences and connect you with verified, ethical, and certified sources. We do not support unethical breeding or puppy mills.</p>
          <br/>
          <p><b>Your Details:</b></p>
          <ul>
            <li><b>Preferred Breed:</b> ${preferredBreed}</li>
            <li><b>Residence:</b> ${apartmentOrHouse}</li>
            <li><b>Experience:</b> ${previousPetExperience}</li>
          </ul>
          <p>Our advisors will reach out to you within 24 hours.</p>
          <br/>
          <p>Warm regards,</p>
          <p><b>Team Sniffnsnooz</b></p>
        `,
      });
    } catch (err) {
      console.error("User email failed:", err);
    }

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error: any) {
    console.error("POST companion lead error:", error);
    return NextResponse.json({ message: "Submission failed", error: error.message }, { status: 500 });
  }
}
