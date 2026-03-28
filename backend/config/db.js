import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
    return conn;
  } catch (error) {
    console.error("Database connection error:", error.message);
    console.log("⚠️  MongoDB not available. Some features may not work.");
    // Don't exit the process, just log the error
    return null;
  }
};

export default connectDB;
