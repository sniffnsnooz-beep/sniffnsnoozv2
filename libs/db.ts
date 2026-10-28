import mongoose from "mongoose";

const DEFAULT_MONGODB_URI =
  "mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-00.fgjcqov.mongodb.net:27017,ac-j5lfmqj-shard-00-01.fgjcqov.mongodb.net:27017,ac-j5lfmqj-shard-00-02.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&replicaSet=atlas-vmt7pn-shard-0&authSource=admin&retryWrites=true&w=majority";

const MONGODB_URI = (typeof process !== "undefined" && process.env?.MONGODB_URI) || DEFAULT_MONGODB_URI;

interface MongooseCache {
  conn: any;
  promise: Promise<any> | null;
}

const g = globalThis as unknown as { _mongooseCache?: MongooseCache };

if (!g._mongooseCache) {
  g._mongooseCache = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  const cache = g._mongooseCache!;

  // Already connected and ready
  if (cache.conn && mongoose.connection.readyState === 1) {
    return cache.conn;
  }

  // If disconnected or disconnecting, reset cache
  if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
    cache.conn = null;
    cache.promise = null;
  }

  const targetUri =
    MONGODB_URI &&
    !MONGODB_URI.includes("your_cluster") &&
    !MONGODB_URI.includes("your_user")
      ? MONGODB_URI
      : DEFAULT_MONGODB_URI;

  // If not currently connecting, initiate connection
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(targetUri, {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        bufferCommands: true,
        maxPoolSize: 10,
      })
      .then((m: any) => {
        console.log("✅ MongoDB Connected Successfully");
        return m;
      })
      .catch((err: any) => {
        cache.promise = null;
        cache.conn = null;
        console.error("❌ MongoDB Connection Error:", err?.message || err);
        throw err;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
};

export default connectToDatabase;