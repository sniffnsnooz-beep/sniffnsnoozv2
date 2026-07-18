import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const PLACE_ID = process.env.GOOGLE_PLACE_ID;

    // Configuration check
    if (!API_KEY || !PLACE_ID) {
      console.error("Missing Google API Configuration");
      return NextResponse.json(
        { reviews: [], error: "API Key or Place ID not configured" },
        { status: 200 }
      );
    }

    // Google Places API URL - Hum wahi fields mangwa rahe hain jo frontend ko chahiye
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Har 1 ghante mein data refresh hoga
    });

    const data = await res.json();

    // Google API status check
    if (data.status !== "OK") {
      return NextResponse.json(
        { reviews: [], error: data.error_message || "Failed to fetch from Google" },
        { status: 200 }
      );
    }

    // Data ko frontend ke format ke hisaab se map karna
    const reviews = (data.result.reviews || []).map((r: any) => ({
      author_name: r.author_name,
      profile_photo_url: r.profile_photo_url,
      rating: r.rating,
      text: r.text,
      time: r.time,
    }));

    return NextResponse.json({
      reviews,
      average_rating: data.result.rating,
      total_user_ratings: data.result.user_ratings_total,
    });

  } catch (error: any) {
    console.error("Reviews API Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}