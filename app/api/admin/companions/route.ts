import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/libs/auth";
import connectToDatabase from "@/libs/db";
import Companion from "@/models/companion";

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) {
    throw new Error("Unauthorized");
  }
  verifyToken(token);
}

// GET: Fetch all companions (Admin)
export async function GET() {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const companions = await Companion.find().sort({ createdAt: -1 });
    return NextResponse.json(companions, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}

// POST: Add new companion
export async function POST(req: Request) {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const body = await req.json();

    const { breedName, category, age, gender, location, temperament, description, images, videos, featuredBadge } = body;

    if (!breedName || !category) {
      return NextResponse.json({ message: "Breed name and category are required" }, { status: 400 });
    }

    const slug = breedName
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    const newCompanion = await Companion.create({
      breedName,
      slug,
      category,
      age,
      gender,
      location,
      temperament,
      description,
      images: images || [],
      videos: videos || [],
      featuredBadge: !!featuredBadge,
    });

    return NextResponse.json({ success: true, data: newCompanion }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}

// PATCH: Update companion
export async function PATCH(req: Request) {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const body = await req.json();
    const { id, breedName, category, age, gender, location, temperament, description, images, videos, featuredBadge, status } = body;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const updateData: any = {
      category,
      age,
      gender,
      location,
      temperament,
      description,
      images,
      videos,
      featuredBadge: !!featuredBadge,
      status,
    };

    if (breedName) {
      updateData.breedName = breedName;
      updateData.slug = breedName
        .toLowerCase()
        .trim()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
    }

    const updated = await Companion.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return NextResponse.json({ message: "Companion not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}

// DELETE: Delete companion
export async function DELETE(req: Request) {
  try {
    await verifyAdmin();
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const deleted = await Companion.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Companion not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Unauthorized" }, { status: 401 });
  }
}
