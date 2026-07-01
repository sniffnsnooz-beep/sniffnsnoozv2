import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body; // 'username' ko hata kar 'email' kiya

    // Debugging ke liye terminal check karein
    console.log("--- LOGIN ATTEMPT ---");
    console.log("Email received:", email);

    if (email === "admin@sniffnsnooz.in" && password === "sniff123") {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET || "master_key_786", { expiresIn: "1d" });

      const response = NextResponse.json({ success: true });
      
      // Cookie settings jo loop rokti hain
      response.cookies.set("admin_token", token, { 
        httpOnly: true, 
        path: "/", 
        maxAge: 86400,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      });

      return response;
    }
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}