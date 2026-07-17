import mongoose from "mongoose";

export const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI || "mongodb+srv://pratimsen10_db_user:moviebook123@cluster0.i27esln.mongodb.net/MovieBook";
  if (!process.env.MONGODB_URI) {
    console.warn("Warning: MONGODB_URI is not set in the environment variables. Using fallback connection URI.");
  }
  await mongoose.connect(dbUri)
    .then(() => { console.log("DB connected") })
    .catch((err) => { console.error("Database connection failed:", err); });
}

