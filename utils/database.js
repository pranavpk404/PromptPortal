import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongodb is already connected");
    return;
  }
  try {
    const URI = process.env.MONGODB_URI;
    const { connection } = await mongoose.connect(URI, {
      dbName: "share_prompt",
    });
    isConnected = true;
    console.log(`Mongodb is connected to ${connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
