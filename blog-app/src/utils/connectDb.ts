import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
  // Set up event listeners only once
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URL!)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.log(`Error connecting to DB: ${error}`);
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDb;
