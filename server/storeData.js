import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();
const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);
const dbName = "alzheimers";
const collectionName = "testResults";

const generateRecommendations = (data) => {
    const recommendations = [];

    if (data.bmi > 25) recommendations.push("Maintain a balanced diet and exercise regularly.");
    if (data.smoking === "Yes") recommendations.push("Consider quitting smoking to lower health risks.");
    if (data.alcoholConsumption === "Daily") recommendations.push("Reduce alcohol intake for better brain health.");
    if (data.dietQuality === "Poor") recommendations.push("Improve your diet with more fruits and vegetables.");
    if (data.sleepQuality === "Poor") recommendations.push("Ensure 7-8 hours of sleep daily for cognitive health.");
    if (data.diabetes === "Yes") recommendations.push("Manage your blood sugar levels carefully.");

    return recommendations.length > 0 ? recommendations : ["Your lifestyle choices are healthy!"];
};

router.post("/store", async (req, res) => {
    try {
        const formData = req.body;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert data into MongoDB
        await collection.insertOne(formData);

        // Generate recommendations
        const recommendations = generateRecommendations(formData);

        res.json({ message: "Data stored successfully", recommendations });
    } catch (err) {
        console.error("Database Error:", err);
        res.status(500).json({ error: "Failed to store data" });
    } finally {
        await client.close();
    }
});

export default router;
