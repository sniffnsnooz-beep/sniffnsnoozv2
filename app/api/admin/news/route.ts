// app/api/admin/news/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/db"; // Tumhara original path
import News from "@/models/news"; // Tumhara original path

// --- GET: Dashboard par news list dikhane ke liye ---
export async function GET() {
  try {
    await connectToDatabase();
    const news = await News.find({}).sort({ createdAt: -1 }); // Latest news pehle
    return NextResponse.json(news, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// --- POST: News publish karne ke liye (Tumhara Original Code) ---
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    console.log("Incoming Data:", body); 

    if (!body.title || !body.content || (!body.image && !body.video)) {
      return NextResponse.json({ message: "Missing fields (must provide image or video)" }, { status: 400 });
    }

    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    const newNews = await News.create({
      title: body.title,
      slug: slug,
      content: body.content,
      image: body.image || "",
      video: body.video || "",
      category: body.category || "Pet Care",
      author: "Sniff n Snooz"
    });

    return NextResponse.json({ success: true, data: newNews }, { status: 201 });
  } catch (error: any) {
    console.error("API ERROR:", error); 
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// --- PATCH: Article edit karne ke liye ---
export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, title, content, image, video, category } = body;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    // Regenerate slug if title changed
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

    const updated = await News.findByIdAndUpdate(
      id,
      { title, slug, content, image: image || "", video: video || "", category },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: any) {
    console.error("PATCH ERROR:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// --- DELETE: Dashboard se news hatane ke liye ---
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Deleted Successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}