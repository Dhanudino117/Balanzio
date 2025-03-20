// backend/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use process.env.MONGO_URI for the connection string (defined in .env file)
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
