import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dataRoutes from "./routes/dataRoutes.js"; // Import routes
import recommendationRoutes from "./routes/recommendationRoutes.js";

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

app.use("/api", recommendationRoutes); 

app.post("/api/data/store", async (req, res) => {
    try {
        const { userId, ...formData } = req.body;

        // Example logic to generate recommendations
        let recommendations = [];

        if (formData.bmi > 25) recommendations.push("Maintain a healthy BMI through diet and exercise.");
        if (formData.smoking === "Yes") recommendations.push("Consider quitting smoking to lower Alzheimer's risk.");
        if (formData.alcoholConsumption === "Daily") recommendations.push("Reduce alcohol consumption for better cognitive health.");
        if (formData.dietQuality === "Poor") recommendations.push("Improve your diet by including more vegetables and healthy fats.");
        if (formData.sleepQuality === "Poor") recommendations.push("Ensure you get at least 7-8 hours of quality sleep.");
        if (formData.diabetes === "Yes") recommendations.push("Monitor and control blood sugar levels to prevent cognitive decline.");

        // Store in MongoDB
        await db.collection("alzheimers").insertOne({ userId, ...formData, recommendations });

        // ✅ Send recommendations in response
        res.json({ message: "Data stored successfully", recommendations });
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
