import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/db"; 
import Booking from "@/models/booking"; 

// 1. POST: Nayi booking create karne ke liye (Website frontend se)
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // 🚨 Body ka structure wahi hona chahiye jo models/booking.ts mein define hai
    const newBooking = await Booking.create(body);

    return NextResponse.json({ success: true, data: newBooking }, { status: 201 });
  } catch (error: any) {
    console.error("Booking Save Error:", error);
    return NextResponse.json({ message: "Booking failed", error: error.message }, { status: 500 });
  }
}

// 2. GET: Dashboard data fetch karne ke liye
export async function GET() {
  try {
    await connectToDatabase();
    // Newest first sorting
    const bookings = await Booking.find().sort({ createdAt: -1 });
    return NextResponse.json(bookings, { status: 200 });
  } catch (error: any) {
    console.error("API GET ERROR:", error);
    return NextResponse.json({ message: "Fetch failed" }, { status: 500 });
  }
}

// 3. PATCH: Booking status update logic
export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const { id, status } = await req.json();
    
    const updated = await Booking.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    if (!updated) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

// 4. DELETE: Booking delete karne ke liye
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { id } = await req.json();
    
    await Booking.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}