import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};
const connection: connectionObject = {};
export const DBconnect = async () => {
  if (connection.isConnected) {
    console.log("Already connected !!");
    return;
  }
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL! || "", {});
    console.log("mongoDb connected");
    connection.isConnected = connect.connections[0].readyState;
  } catch (error) {
    console.log("failed to connect");
    console.log(error);
  }
};
