async function ping() {
  console.log("Pinging Google & Bing Search Indexing Engine for https://sniffnsnooz.in/sitemap.xml ...");
  
  try {
    const googleRes = await fetch("https://www.google.com/ping?sitemap=https://sniffnsnooz.in/sitemap.xml");
    console.log("✅ Google Sitemap Ping Status:", googleRes.status, googleRes.statusText);
  } catch (e) {
    console.error("Google Ping:", e.message);
  }

  try {
    const bingRes = await fetch("https://www.bing.com/ping?sitemap=https://sniffnsnooz.in/sitemap.xml");
    console.log("✅ Bing Sitemap Ping Status:", bingRes.status, bingRes.statusText);
  } catch (e) {
    console.error("Bing Ping:", e.message);
  }
}

ping();
