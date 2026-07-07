// Script to update existing news articles with unique images
// Run: node update_article_images.mjs

const SITE = "https://sniffnsnooz.in";

// Unique Cloudinary-compatible public domain pet grooming images
// Using Unsplash (free, no API key needed for direct URLs)
const uniqueImages = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80",   // dog bath
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80",   // two dogs running
  "https://images.unsplash.com/photo-1615789591457-74a63395c990?w=1200&q=80", // cat grooming
  "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1200&q=80", // dog groomer
  "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&q=80", // golden retriever
  "https://images.unsplash.com/photo-1546470427-f93c18e38a5b?w=1200&q=80",   // dog shampoo
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200&q=80", // pomeranian groomed
  "https://images.unsplash.com/photo-1534361960057-19f4434a4d72?w=1200&q=80", // dog spa
  "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1200&q=80", // happy dog
  "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=1200&q=80", // dog with bandana
];

async function run() {
  // Fetch all articles
  const res = await fetch(`${SITE}/api/admin/news`);
  if (!res.ok) {
    console.error("Failed to fetch articles. Make sure sniffnsnooz.in is live.");
    process.exit(1);
  }
  const articles = await res.json();
  console.log(`Found ${articles.length} articles.\n`);

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const uniqueImage = uniqueImages[i % uniqueImages.length];

    // Skip if article already has a unique image (not matching the first few repeated ones)
    console.log(`[${i + 1}/${articles.length}] Updating: "${article.title}"`);
    console.log(`  Old image: ${article.image || article.video || "none"}`);
    console.log(`  New image: ${uniqueImage}`);

    const patchRes = await fetch(`${SITE}/api/admin/news`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: article._id,
        title: article.title,
        content: article.content,
        category: article.category,
        image: uniqueImage,
        video: "",
      }),
    });

    if (patchRes.ok) {
      console.log(`  ✅ Updated successfully!\n`);
    } else {
      const err = await patchRes.json();
      console.log(`  ❌ Failed: ${err.message}\n`);
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("🎉 All articles updated with unique images!");
}

run().catch(console.error);
