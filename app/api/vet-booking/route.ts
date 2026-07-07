import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ------------- Email Transport ------------- */
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });
}

/* ------------- POST /api/vet-booking ------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name = "",
      phone = "",
      email = "",
      petName = "",
      petType = "",
      service = "",
      preferredDate = "",
      preferredTime = "",
      notes = "",
    } = body;

    if (!name || !phone || !service) {
      return NextResponse.json(
        { success: false, message: "Name, phone, and service are required." },
        { status: 400 }
      );
    }

    const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.GMAIL_USER || "";
    const transporter = createTransporter();

    const show = (label: string, value: string) =>
      value ? `<p><b>${label}:</b> ${value}</p>` : "";

    /* ----- Owner email ----- */
    try {
      await transporter.sendMail({
        from: `"Sniffnsnooz Vet Booking" <${process.env.GMAIL_USER}>`,
        to: OWNER_EMAIL,
        subject: "🩺 New Veterinary Appointment Request",
        html: `
          <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;border:1px solid #f0e8df;border-radius:16px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#5b3a26,#8c5a3b);padding:28px 32px;">
              <h2 style="color:#fff;margin:0;font-size:22px;">🩺 New Vet Appointment Request</h2>
              <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">Sniff n Snooz Veterinary Booking System</p>
            </div>
            <div style="padding:28px 32px;background:#fdfbf7;">
              <h3 style="color:#5b3a26;border-bottom:2px solid #f0e8df;padding-bottom:8px;">👤 Pet Parent Details</h3>
              ${show("Name", name)}
              ${show("Phone", phone)}
              ${show("Email", email)}

              <h3 style="color:#5b3a26;border-bottom:2px solid #f0e8df;padding-bottom:8px;margin-top:24px;">🐾 Pet Details</h3>
              ${show("Pet Name", petName)}
              ${show("Pet Type", petType)}

              <h3 style="color:#5b3a26;border-bottom:2px solid #f0e8df;padding-bottom:8px;margin-top:24px;">🩺 Appointment Details</h3>
              ${show("Service Requested", service)}
              ${show("Preferred Date", preferredDate)}
              ${show("Preferred Time", preferredTime)}
              ${show("Additional Notes", notes)}

              <div style="background:#f6efe6;border-radius:12px;padding:16px;margin-top:24px;font-size:13px;color:#7a5741;">
                Generated via Sniffnsnooz Veterinary Booking System
              </div>
            </div>
          </div>
        `,
      });
    } catch (ownerEmailErr) {
      console.error("⚠️ Owner email failed:", ownerEmailErr);
    }

    /* ----- Customer confirmation email ----- */
    if (email) {
      try {
        await transporter.sendMail({
          from: `"Sniff n Snooz" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: "✅ Vet Appointment Request Received | Sniff n Snooz",
          html: `
            <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;border:1px solid #f0e8df;border-radius:16px;overflow:hidden;">
              <div style="background:linear-gradient(135deg,#5b3a26,#8c5a3b);padding:28px 32px;">
                <h2 style="color:#fff;margin:0;font-size:22px;">✅ Appointment Request Received!</h2>
                <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">Sniff n Snooz Veterinary Care</p>
              </div>
              <div style="padding:28px 32px;background:#fdfbf7;">
                <p style="font-size:16px;color:#5b3a26;">Hi ${name || "Pet Parent"} 👋,</p>
                <p style="color:#7a5741;line-height:1.7;">Thank you for choosing <b>Sniff n Snooz Veterinary Care</b>! We've received your appointment request and our team will contact you shortly to confirm.</p>

                <div style="background:#f6efe6;border-radius:16px;padding:20px;margin:24px 0;">
                  ${show("Service", service)}
                  ${show("Pet Name", petName)}
                  ${show("Pet Type", petType)}
                  ${show("Preferred Date", preferredDate)}
                  ${show("Preferred Time", preferredTime)}
                </div>

                <p style="color:#7a5741;line-height:1.7;font-size:14px;">Our vet team will reach out to you on <b>${phone}</b> to confirm the appointment details. If you need immediate assistance, please call us at <b>+91-9818728444</b>.</p>

                <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0e8df;text-align:center;">
                  <p style="color:#5b3a26;font-weight:600;margin:0;">🐾 Team Sniff n Snooz</p>
                  <p style="color:#7a5741;font-size:13px;margin:4px 0 0;">Where Premium Care Meets Unconditional Love ❤️</p>
                </div>
              </div>
            </div>
          `,
        });
      } catch (customerEmailErr) {
        console.error("⚠️ Customer email failed:", customerEmailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Vet appointment request received! We'll contact you soon.",
    });
  } catch (error) {
    console.error("❌ Vet Booking API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Booking failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
