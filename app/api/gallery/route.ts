import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/db";
import Gallery from "@/models/gallery";

export async function GET() {
  try {
    await connectToDatabase();
    const media = await Gallery.find({ visible: true }).sort({ createdAt: -1 });
    return NextResponse.json(media, { status: 200 });
  } catch (error: any) {
    console.error("GET gallery error:", error);
    return NextResponse.json({ message: "Fetch failed", error: error.message }, { status: 500 });
  }
}
