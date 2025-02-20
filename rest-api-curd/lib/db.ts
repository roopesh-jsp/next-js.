import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URI;

if (!MONGO_URL) {
  throw new Error("please give MONGO_URL in .env file");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opt = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    cached.promise = mongoose
      .connect(MONGO_URL!, opt)
      .then(() => mongoose.connection);
  }

  if (cached.promise) {
    try {
      cached.conn = await cached.promise;
    } catch (error) {
      cached.promise = null;
      throw new Error("failed to connect dataBase");
    }
  }

  return cached.conn;
}
