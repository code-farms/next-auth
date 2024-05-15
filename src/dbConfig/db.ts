import mongoose from "mongoose";

export default function connect() {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(`${process.env.MONGODB_URI}/next-auth`);
    const connection = mongoose.connection;

    // Log if the connection is successful
    connection.on("connected", () => {
      console.log("Connected to DB");
    });

    // Log if the connection is unsuccessful
    connection.on("error", (err: any) => {
      console.log("MongoDB connection error", err);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong in connecting DB", error);
  }
}
