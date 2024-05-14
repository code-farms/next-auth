import mongoose from "mongoose";

export default function connect() {
  try {
    mongoose.connect(`${process.env.MONGODB_URI}/next-auth`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to DB");
    });

    connection.on("error", (err: any) => {
      console.log("MongoDB connection error", err);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong in connecting DB", error);
  }
}
