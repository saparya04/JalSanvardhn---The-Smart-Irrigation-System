import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "https://jal-sanvardhn-the-smart-irrigation-system-mplx-lnjx5cn6x.vercel.app",credentials: true }));
app.use(cookieParser());

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/crop", cropRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
