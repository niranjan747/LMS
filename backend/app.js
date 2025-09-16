import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import "./models/UserModel.js"; // register model
import "./models/CategoryModel.js"; // register model
import "./models/CourseModel.js"; // register model
import "./models/EnrollmentModel.js"; // register model
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV !== "development") {
  app.use(morgan("dev"));
}

// Auth routes
app.use("/api/auth", authRoutes);

// Category routes
app.use("/api/categories", categoryRoutes);

// Course routes
app.use("/api/courses", courseRoutes);

// User routes
app.use("/api/users", userRoutes);

// Enrollment routes
app.use("/api/enrollments", enrollmentRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

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
await connectDB();

// Config
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
