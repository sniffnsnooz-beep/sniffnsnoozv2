import mongoose from "mongoose";

const DEFAULT_MONGODB_URI =
  "mongodb://sniffnsnooz_db_user:I0xqBeDtZ7oyRQK6@ac-j5lfmqj-shard-00-00.fgjcqov.mongodb.net:27017,ac-j5lfmqj-shard-00-01.fgjcqov.mongodb.net:27017,ac-j5lfmqj-shard-00-02.fgjcqov.mongodb.net:27017/sniffnsnooz?ssl=true&replicaSet=atlas-vmt7pn-shard-0&authSource=admin&retryWrites=true&w=majority";

const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

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

  const targetUri =
    MONGODB_URI &&
    !MONGODB_URI.includes("your_cluster") &&
    !MONGODB_URI.includes("your_user")
      ? MONGODB_URI
      : DEFAULT_MONGODB_URI;

  // If already connecting, wait for that
  if (!global._mongooseCache.promise) {
    global._mongooseCache.promise = mongoose
      .connect(targetUri, {
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