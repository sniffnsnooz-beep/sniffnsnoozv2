// Step 2: Update all DB articles with their unique local image paths
// Run AFTER download_article_images.mjs completes
// Run: node update_db_with_local_images.mjs

import fs from "fs";

const SITE = "https://sniffnsnooz.in";

async function main() {
  // Load mapping
  if (!fs.existsSync("./image_mapping.json")) {
    console.error("Run download_article_images.mjs first!");
    process.exit(1);
  }
  const mapping = JSON.parse(fs.readFileSync("./image_mapping.json", "utf-8"));

  // Fetch all articles sorted newest first (same order as DB returns)
  const res = await fetch(`${SITE}/api/admin/news`);
  if (!res.ok) { console.error("Failed to fetch articles"); process.exit(1); }
  const articles = await res.json();

  console.log(`Updating ${articles.length} articles with unique local images...\n`);

  let success = 0, failed = 0;
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const localImagePath = mapping[i] || mapping[i % Object.keys(mapping).length];

    const patchRes = await fetch(`${SITE}/api/admin/news`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: article._id,
        title: article.title,
        content: article.content,
        category: article.category,
        image: localImagePath,
        video: "",
      }),
    });

    if (patchRes.ok) {
      success++;
      console.log(`[${i + 1}/${articles.length}] ✅ "${article.title.substring(0, 50)}" → ${localImagePath}`);
    } else {
      failed++;
      const err = await patchRes.json();
      console.log(`[${i + 1}/${articles.length}] ❌ Failed: ${err.message}`);
    }

    if (i % 20 === 19) await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n🎉 Done! ${success} updated, ${failed} failed.`);
}

main().catch(console.error);
