import mongoose from "mongoose";

/**
 * Database connection script.
 *
 */
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected");
    return mongoose.connection.db;
  }

  try {
    await mongoose.connect(process.env.DATABASE_URI!, {
      dbName: "learn-with-articles",
      serverSelectionTimeoutMS: 5000 * 5,
    });

    console.log("MongoDB connected");

    return mongoose.connection.db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
