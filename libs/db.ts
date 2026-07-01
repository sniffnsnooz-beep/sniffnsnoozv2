import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  // Already connected
  if (global._mongooseCache.conn) return global._mongooseCache.conn;

  // Validate URI
  if (
    !MONGODB_URI ||
    MONGODB_URI.includes("your_cluster") ||
    MONGODB_URI.includes("your_user")
  ) {
    throw new Error("❌ MONGODB_URI is not configured in .env.local");
  }

  // If already connecting, wait for that
  if (!global._mongooseCache.promise) {
    global._mongooseCache.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        bufferCommands: false,
        maxPoolSize: 10,
      })
      .then((m) => {
        console.log("✅ MongoDB Connected Successfully");
        return m;
      })
      .catch((err) => {
        global._mongooseCache.promise = null;
        console.error("❌ MongoDB Connection Error:", err.message);
        throw err;
      });
  }

  global._mongooseCache.conn = await global._mongooseCache.promise;
  return global._mongooseCache.conn;
};

export default connectToDatabase;