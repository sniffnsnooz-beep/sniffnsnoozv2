import mongoose from "mongoose";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectToDatabase from "@/libs/db";
import Booking from "@/models/booking";

/* ---------------- EMAIL TRANSPORT ---------------- */
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
}

/* ---------------- POST BOOKING ---------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    /* ================= SMART EXTRACTION ================= */

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    
    // Support string or LatLng format
    const location = body.location;
    const address = body.address || {};
    const addressStr = address.fullAddress || 
        [address.house, address.street].filter(Boolean).join(", ");
    const serviceLocation = body.serviceLocation || "Home";
    const shopAddress = body.shopAddress || "";
    
    // Nested Extraction
    const petDetails = body.petDetails || {};
    const styling = body.styling || {};
    const booking = body.booking || {};

    const { basePrice, total, date, slot, items } = booking;
    const { petName, petBreed, petAge, petAllergies } = petDetails;
    
    // ✅ FIX: Read friendly flags directly from petDetails (as sent by the form)
    const friendlyHuman = petDetails.friendlyWithHumans;
    const friendlyPets = petDetails.friendlyWithPets;

    // Backward compatibility for root variables
    const finalStyle = styling.styleSelected || styling.style || body.styleSelected;
    const finalHairLength = styling.hairLength || body.hairLength;
    const finalMatting = styling.mattingApproval || body.mattingApproval;


    const consentAccepted = body.consentAccepted === true || body.consentAccepted === "Yes";

    /* ================= SAVE TO MONGODB ================= */
    let bookingDocument = null;
    try {
      await connectToDatabase();
      // Format payload exactly as the Mongoose Schema expects it
      bookingDocument = await Booking.create({
        user: {
          name,
          phone,
          email,
          address: addressStr || shopAddress,
          location: typeof location === "object" ? location : undefined,
        },
        pet: {
          parentName: name,
          petName,
          breed: petBreed,
          age: petAge,
          allergies: petAllergies,
          friendlyWithHumans: friendlyHuman === true || friendlyHuman === "Yes",
          friendlyWithPets: friendlyPets === true || friendlyPets === "Yes",
        },
        services: items || [],
        date: date,
        slot: slot,
        total: total || basePrice || 0,
        consentAccepted: consentAccepted,
      });
      console.log("✅ Booking saved to Database successfully!");
    } catch (dbError) {
      console.error("⚠️ Failed to save to Database:", dbError);
      return NextResponse.json(
        { success: false, message: "Failed to save booking. Please try again later." },
        { status: 500 }
      );
    }

    /* ================= EMAIL SETUP ================= */

    const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.GMAIL_USER || "";
    const transporter = createTransporter();

    /* ================= LOCATION HANDLING ================= */

    const safeLocation =
      typeof location === "string"
        ? location
        : location?.lat && location?.lng
        ? `Lat: ${location.lat}, Lng: ${location.lng}`
        : "";

    const mapLink =
      typeof location === "string" && location.trim() !== ""
        ? `https://www.google.com/maps?q=${encodeURIComponent(location)}`
        : location?.lat && location?.lng
        ? `https://www.google.com/maps?q=${location.lat},${location.lng}`
        : "";

    /* ================= CONDITIONAL HELPERS ================= */

    const show = (label: string, value: any) =>
      value
        ? `<p><b>${label}:</b> ${value}</p>`
        : "";

    /* ---------------- OWNER EMAIL ---------------- */
    try {
      await transporter.sendMail({
        from: `"Sniffnsnooz Booking" <${process.env.GMAIL_USER}>`,
        to: OWNER_EMAIL,
        subject: "🐾 New Grooming Booking Received",
        html: `
          <h2>🐾 New Booking Received</h2>
  
          <hr />
  
          <h3>👤 Pet Parent Details</h3>
          ${show("Name", name)}
          ${show("Phone", phone)}
          ${show("Email", email)}
  
          ${
            petName ||
            petBreed ||
            petAge ||
            petAllergies
              ? `
          <hr />
          <h3>🐶 Pet Details</h3>
          ${show("Pet Name", petName)}
          ${show("Breed", petBreed)}
          ${show("Age", petAge)}
          ${show("Allergies", petAllergies)}
          ${
            friendlyHuman !== undefined
              ? `<p><b>Friendly with Humans:</b> ${
                  friendlyHuman === true || friendlyHuman === "Yes" ? "Yes" : "No"
                }</p>`
              : ""
          }
          ${
            friendlyPets !== undefined
              ? `<p><b>Friendly with Other Pets:</b> ${
                  friendlyPets === true || friendlyPets === "Yes" ? "Yes" : "No"
                }</p>`
              : ""
          }
          `
              : ""
          }
  
          ${
            finalStyle || finalHairLength || finalMatting
              ? `
          <hr />
          <h3>✂️ Styling Preferences</h3>
          ${show("Style Selected", finalStyle)}
          ${
            finalHairLength
              ? `<p><b>Hair Length / Cut Size:</b> ${finalHairLength} inch</p>`
              : ""
          }
          ${
            finalMatting
              ? `<p><b>Matting Approval:</b> ${
                  finalMatting === "approve" || finalMatting === "Approve Removal"
                    ? "Approved"
                    : "Not Approved (Limited Results)"
                }</p>`
              : ""
          }
          `
              : ""
          }
  
          <hr />
  
          <h3>📅 Booking Details</h3>
          ${show("Date", date)}
          ${show("Time Slot", slot)}
          ${show("Service Mode", serviceLocation === "Store" ? "🏪 Store Visit" : "🏠 At-Home Booking")}
  
          ${
            Array.isArray(items) && items.length > 0
              ? `
          <hr />
          <h3>🧾 Selected Services</h3>
          <ul>
            ${items
              .map(
                (item: any) => `
              <li>
                <b>${item.name}</b>
                ${item.time ? ` (⏱ ${item.time})` : ""}
                – ₹${item.price}
              </li>
            `
              )
              .join("")}
          </ul>
          `
              : ""
          }
  
          <hr />
  
          <h3>💰 Pricing</h3>
          ${show("Base Price", `₹${basePrice || 0}`)}
          ${show("Total Amount", `₹${total || 0}`)}
  
          <hr />
          <h3>📍 Location Provided</h3>
          ${serviceLocation === "Store" ? `<p>User opted for Store Visit. <b>Store Address:</b> ${shopAddress}</p>` : ""}
          ${serviceLocation === "Home" && addressStr ? `<p><b>Provided Address:</b> ${addressStr}</p>` : ""}
          ${safeLocation ? `<p><b>GPS Linked:</b> ${safeLocation}</p>` : ""}
          ${mapLink ? `<p><a href="${mapLink}" target="_blank" style="color:#5b3a26;font-weight:600;text-decoration:none;">📍 View GPS on Google Maps</a></p>` : ""}
  
          ${
            consentAccepted
              ? `
          <hr />
          <h3>📝 Grooming Consent</h3>
          <p>✅ Customer has read and agreed to all grooming terms and conditions.</p>
          `
              : ""
          }
  
          <p style="font-size:12px;color:#777">
            Generated via Sniffnsnooz online booking system.
          </p>
        `,
      });
    } catch (ownerEmailErr) {
      console.error("⚠️ Non-fatal: Could not push owner email", ownerEmailErr);
    }

    /* ---------------- CUSTOMER EMAIL ---------------- */
    try {
      await transporter.sendMail({
        from: `"Sniffnsnooz" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "✅ Booking Confirmed | Sniffnsnooz",
        html: `
          <h2>Your Booking is Confirmed 🐶✨</h2>
          <p>Hi ${name || "Pet Parent"},</p>
  
          <p>Thank you for booking <b>Sniffnsnooz Premium Pet Care</b>.</p>
  
          ${show("Service Option", serviceLocation === "Store" ? "Store Visit" : "At-Home Doorstep Groming")}
          ${show("Date", date)}
          ${show("Time Slot", slot)}
          ${show("Total Amount", `₹${total || 0}`)}
  
          <p>Our groomer will contact you before the appointment to confirm details.</p>
          <br/>
          <p>🐾 Team Sniffnsnooz</p>
        `,
      });
    } catch (customerEmailErr) {
      console.error("⚠️ Non-fatal: Could not send Customer Confirmation email (Invalid Address or Mail Server Issue).", customerEmailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Booking received & notifications sent",
    });
  } catch (error) {
    console.error("❌ Booking API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Booking failed",
      },
      { status: 400 }
    );
  }
}
