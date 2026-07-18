import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/libs/auth";
import connectToDatabase from "@/libs/db";
import CompanionLead from "@/models/companionLead";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  verifyToken(token);
}

// GET: Fetch all companion leads
export async function GET() {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const leads = await CompanionLead.find().sort({ createdAt: -1 });
    return NextResponse.json(leads, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}

// PATCH: Update lead status
export async function PATCH(req: Request) {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ message: "ID and status are required" }, { status: 400 });
    }

    const updated = await CompanionLead.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}

// DELETE: Delete lead
export async function DELETE(req: Request) {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const deleted = await CompanionLead.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}
