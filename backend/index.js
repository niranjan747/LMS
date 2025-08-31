import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import "./models/UserModel.js"; // register model
import "./models/CategoryModel.js"; // register model
import "./models/CourseModel.js"; // register model

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "development") {
  app.use(morgan("dev"));
}

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV || "development" });
});

// Example root route
app.get("/", (req, res) => {
  res.send("Learning Management System API");
});

// Model check route (dev only)
if (process.env.NODE_ENV !== "production") {
  app.get("/dev/models", (req, res) => {
    const hasUser = Boolean(mongoose.models?.User);
    res.json({ models: Object.keys(mongoose.models), hasUser });
  });
}

// DB
connectDB().catch(() => {
  // Already logged in connectDB; continue so server can still run without DB
});

// Config
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
