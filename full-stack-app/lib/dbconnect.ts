import mongoose from "mongoose";

//creating a type
type connectionObj = {
  isConnected?: number;
};

const connection: connectionObj = {};

//connecting to DB
async function dbConnect(): Promise<void> {
  //checking for existing connection
  if (connection?.isConnected) {
    console.log("already connected");
    return;
  }

  //creating a connection
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL || "", {});

    //storing conn info so that we can avoid re-conn in future
    connection.isConnected = conn.connections[0].readyState;
  } catch (error) {
    console.log("database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
0;
