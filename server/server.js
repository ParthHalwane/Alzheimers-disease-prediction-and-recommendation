import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dataRoutes from "./routes/dataRoutes.js"; // Import routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // MongoDB Connection String


mongoose
    .connect(MONGO_URI, { dbName: "alzheimers", useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected to alzheimers database"))
    .catch((err) => console.error("MongoDB Connection Error:", err));


app.use("/api/data", dataRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
