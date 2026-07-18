import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/libs/auth";
import connectToDatabase from "@/libs/db";
import Gallery from "@/models/gallery";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  verifyToken(token);
}

// GET: Fetch all gallery items (Admin)
export async function GET() {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const media = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(media, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}

// POST: Add new media
export async function POST(req: Request) {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const body = await req.json();

    const { title, url, mediaType, category, tags, featured, visible } = body;

    if (!title || !url || !mediaType) {
      return NextResponse.json({ message: "Title, url, and mediaType are required" }, { status: 400 });
    }

    const newMedia = await Gallery.create({
      title,
      url,
      mediaType,
      category: category || "Grooming",
      tags: tags || [],
      featured: !!featured,
      visible: visible !== false,
    });

    return NextResponse.json({ success: true, data: newMedia }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}

// PATCH: Update gallery item
export async function PATCH(req: Request) {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const body = await req.json();
    const { id, title, url, mediaType, category, tags, featured, visible } = body;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const updated = await Gallery.findByIdAndUpdate(
      id,
      { title, url, mediaType, category, tags, featured, visible },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Media not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}

// DELETE: Delete gallery item
export async function DELETE(req: Request) {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const deleted = await Gallery.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Media not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}
