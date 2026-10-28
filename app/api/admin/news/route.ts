// app/api/admin/news/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "@/libs/db";
import News from "@/models/news";

// Helper function to safely generate a unique, URL-friendly slug
async function generateUniqueSlug(title: string, currentId?: string): Promise<string> {
  let baseSlug = (title || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Collapse spaces and hyphens
    .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens

  if (!baseSlug) {
    baseSlug = `article-${Date.now().toString(36)}`;
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const query: any = { slug };
    if (currentId) {
      query._id = { $ne: currentId };
    }
    const existing = await News.findOne(query).select("_id").lean();
    if (!existing) {
      break;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

// --- GET: Fetch all articles for admin dashboard ---
export async function GET() {
  try {
    await connectToDatabase();
    const news = await News.find({}).sort({ createdAt: -1 });
    return NextResponse.json(news, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/admin/news ERROR:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

// --- POST: Publish a new article (With automatic unique slug & validation) ---
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const title = (body.title || "").trim();
    const content = (body.content || "").trim();
    const image = (body.image || "").trim();
    const video = (body.video || "").trim();
    const category = (body.category || "Pet Care").trim();
    const author = (body.author || "Sniff n Snooz").trim();

    if (!title) {
      return NextResponse.json({ success: false, message: "Article title is required." }, { status: 400 });
    }

    if (!content || content === "<p><br></p>") {
      return NextResponse.json({ success: false, message: "Article content cannot be empty." }, { status: 400 });
    }

    if (!image && !video) {
      return NextResponse.json(
        { success: false, message: "Please upload at least one photo or video." },
        { status: 400 }
      );
    }

    // Auto-generate guaranteed unique slug to avoid E11000 duplicate key 500 errors
    const slug = await generateUniqueSlug(title);

    const newNews = await News.create({
      title,
      slug,
      content,
      image,
      video,
      category,
      author,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Article published successfully! 🐾",
        data: newNews,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/admin/news ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error while publishing article.",
      },
      { status: 500 }
    );
  }
}

// --- PATCH: Update existing article ---
export async function PATCH(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, title, content, image, video, category } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Article ID is required." }, { status: 400 });
    }

    const updateData: any = {};
    if (category) updateData.category = category.trim();
    if (content !== undefined) updateData.content = content;
    if (image !== undefined) updateData.image = image;
    if (video !== undefined) updateData.video = video;

    if (title && title.trim()) {
      updateData.title = title.trim();
      updateData.slug = await generateUniqueSlug(title.trim(), id);
    }

    const updated = await News.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updated) {
      return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Article updated successfully! ✅",
        data: updated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PATCH /api/admin/news ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error while updating article.",
      },
      { status: 500 }
    );
  }
}

// --- DELETE: Delete article ---
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Article ID is required." }, { status: 400 });
    }

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return NextResponse.json({ success: false, message: "Article not found." }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Article deleted successfully! 🗑️",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /api/admin/news ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal server error while deleting article.",
      },
      { status: 500 }
    );
  }
}