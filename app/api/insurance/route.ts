import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectToDatabase from "@/libs/db";
import InsuranceLead from "@/models/insuranceLead";

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
}

// POST: Save insurance lead & send emails
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { petType, breed, age, ownerName, phone, city } = body;

    if (!petType || !breed || !age || !ownerName || !phone || !city) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Save lead to database
    const newLead = await InsuranceLead.create({
      petType,
      breed,
      age,
      ownerName,
      phone,
      city,
    });

    // Send emails
    const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.GMAIL_USER || "";
    const transporter = createTransporter();

    // 1. Owner email
    try {
      await transporter.sendMail({
        from: `"Sniffnsnooz Insurance Support" <${process.env.GMAIL_USER}>`,
        to: OWNER_EMAIL,
        subject: "🛡️ New Pet Insurance Quote Request Received",
        html: `
          <h2>🛡️ New Insurance Quote Request</h2>
          <p><b>Owner Name:</b> ${ownerName}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>City:</b> ${city}</p>
          <p><b>Pet Type:</b> ${petType}</p>
          <p><b>Pet Breed:</b> ${breed}</p>
          <p><b>Pet Age:</b> ${age}</p>
        `,
      });
    } catch (err) {
      console.error("Owner email failed:", err);
    }

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error: any) {
    console.error("POST insurance lead error:", error);
    return NextResponse.json({ message: "Submission failed", error: error.message }, { status: 500 });
  }
}
