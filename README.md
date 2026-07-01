# 🐾 Sniff n Snooz — Premium Doorstep Pet Grooming

A full-stack Next.js 15 website for Sniff n Snooz, a premium doorstep pet grooming service in Delhi NCR.

## ✨ Features

- 🏠 **Doorstep booking** with date, slot & address picker
- 💳 **Razorpay** payment integration
- 📰 **News/Blog** section with 200+ paginated articles
- 🖼️ **Cloudinary** media uploads (photos + videos)
- 📊 **Admin Dashboard** — manage bookings, post news articles
- 🗺️ **Location & Contact** page with Google Maps embed
- 🌟 **Google Reviews** integration
- 📱 **Fully responsive** — mobile, tablet, desktop
- ⚡ **Zero-lag** pagination (12 articles per page)
- 🔒 **Admin authentication** with JWT cookies

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Database**: MongoDB Atlas
- **Media**: Cloudinary
- **Styling**: Tailwind CSS + Framer Motion
- **Authentication**: JWT cookies
- **Deployment**: Vercel

## 🚀 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌍 Environment Variables

Create a `.env.local` file with:

```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
```

## 📁 Project Structure

```
app/
├── admin/          # Admin login & dashboard
├── api/            # API routes (bookings, news, auth)
├── booking/        # Booking flow
├── news/           # Blog articles (paginated)
├── services/       # Service pages
└── ...
components/
├── Navbar.tsx      # Animated responsive navbar
├── Footer.tsx      # Footer with SEO schema
├── Hero3D.tsx      # Animated hero section
└── ...
```

## 🔐 Admin Panel

Access at `/admin` — use the configured admin password.

Features:
- View & manage all bookings
- Update booking status
- Post / delete news articles with photo or video
- Live sync (auto-refreshes every 5 seconds)

---

Made with ❤️ for Sniff n Snooz