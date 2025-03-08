import express from "express";
import PatientParameter from "../models/DataModel.js";
import getRecommendations from "../utils/getRecommendations.js";

const router = express.Router();

router.post("/store", async (req, res) => {
    try {
        const { userId, ...parameters } = req.body;

        // Generate recommendations based on parameters
        const recommendations = getRecommendations(parameters);

        // Log recommendations to console for debugging
        console.log("Generated Recommendations:", recommendations);

        // Save data to MongoDB
        const newEntry = new PatientParameter({ userId, ...parameters });
        await newEntry.save();

        // Send response with recommendations
        res.json({ success: true, recommendations });
    } catch (error) {
        console.error("Error storing data:", error);
        res.status(500).json({ success: false, message: "Failed to store data" });
    }
});

export default router;
