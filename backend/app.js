import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errors.js";
const app = express();

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

import { connectDatabase } from "./config/dbConnect.js";
// Connecting to database
connectDatabase();

app.use(express.json());
app.use(cookieParser());
// Inject extended query parsing for nested url parameters (e.g., price[gte])
app.set("query parser", "extended");

//import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const mode = process.env.NODE_ENV && process.env.NODE_ENV.trim() || "development";

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${mode} mode.`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err}`);
    console.log("Shutting down the server due to unhandled promise rejection");
    server.close(() => {
        process.exit(1);
    });
});